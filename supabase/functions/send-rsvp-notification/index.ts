import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEFAULT_RECIPIENT = 'ramwill1991@gmail.com';
const SOURCE_LABEL = 'We Are Leaving website RSVP';
const SUBJECT_PREFIX = 'New RSVP submission from website';

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const recipient = Deno.env.get('RSVP_NOTIFICATION_RECIPIENT') ?? DEFAULT_RECIPIENT;

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse(
      {
        success: false,
        notificationStatus: 'retry_required',
        attemptedAt: new Date().toISOString(),
        attemptCount: 0,
        error: 'Missing Supabase service credentials for RSVP notification.',
      },
      500,
    );
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  try {
    const { rsvpId, guestName } = await request.json();

    if (!rsvpId || typeof rsvpId !== 'string') {
      return jsonResponse(
        {
          success: false,
          notificationStatus: 'retry_required',
          attemptedAt: new Date().toISOString(),
          attemptCount: 0,
          error: 'Missing RSVP id.',
        },
        400,
      );
    }

    const attemptedAt = new Date().toISOString();
    const resolvedGuestName =
      typeof guestName === 'string' && guestName.trim().length > 0 ? guestName.trim() : 'Unknown guest';

    const { data: existingRow, error: existingRowError } = await adminClient
      .from('guest_rsvps')
      .select('notification_attempts')
      .eq('id', rsvpId)
      .single();

    if (existingRowError) {
      return jsonResponse(
        {
          success: false,
          notificationStatus: 'retry_required',
          attemptedAt,
          attemptCount: 0,
          error: existingRowError.message,
        },
        500,
      );
    }

    const attemptCount = (existingRow?.notification_attempts ?? 0) + 1;

    if (!resendApiKey) {
      const missingSecretError = 'Missing RESEND_API_KEY for RSVP notification delivery.';
      await adminClient
        .from('guest_rsvps')
        .update({
          notification_status: 'retry_required',
          notification_recipient: recipient,
          notification_attempts: attemptCount,
          notification_last_attempt_at: attemptedAt,
          notification_error: missingSecretError,
        })
        .eq('id', rsvpId);

      return jsonResponse(
        {
          success: false,
          notificationStatus: 'retry_required',
          attemptedAt,
          attemptCount,
          error: missingSecretError,
        },
        500,
      );
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: Deno.env.get('RSVP_NOTIFICATION_FROM') ?? 'RSVP <onboarding@resend.dev>',
        to: [recipient],
        subject: `${SUBJECT_PREFIX}: ${resolvedGuestName}`,
        text: `${SOURCE_LABEL}\n\nNew confirmed guest: ${resolvedGuestName}\nRSVP ID: ${rsvpId}\nSubmitted at: ${attemptedAt}`,
      }),
    });

    if (!resendResponse.ok) {
      const responseText = await resendResponse.text();
      const deliveryError = `Notification provider error: ${responseText}`;

      await adminClient
        .from('guest_rsvps')
        .update({
          notification_status: 'retry_required',
          notification_recipient: recipient,
          notification_attempts: attemptCount,
          notification_last_attempt_at: attemptedAt,
          notification_error: deliveryError,
        })
        .eq('id', rsvpId);

      return jsonResponse(
        {
          success: false,
          notificationStatus: 'retry_required',
          attemptedAt,
          attemptCount,
          error: deliveryError,
        },
        500,
      );
    }

    await adminClient
      .from('guest_rsvps')
      .update({
        notification_status: 'sent',
        notification_recipient: recipient,
        notification_attempts: attemptCount,
        notification_last_attempt_at: attemptedAt,
        notification_sent_at: attemptedAt,
        notification_error: null,
      })
      .eq('id', rsvpId);

    return jsonResponse({
      success: true,
      notificationStatus: 'sent',
      attemptedAt,
      attemptCount,
    });
  } catch (error) {
    const attemptedAt = new Date().toISOString();
    return jsonResponse(
      {
        success: false,
        notificationStatus: 'retry_required',
        attemptedAt,
        attemptCount: 0,
        error: error instanceof Error ? error.message : 'Unknown notification error.',
      },
      500,
    );
  }
});
