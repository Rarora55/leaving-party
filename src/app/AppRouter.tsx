import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GuestListPage } from '../pages/GuestListPage/GuestListPage';
import { HalfMilePage } from '../pages/HalfMilePage/HalfMilePage';
import { HomePage } from '../pages/HomePage/HomePage';
import { MessagesPage } from '../pages/MessagesPage/MessagesPages';
import { AppShell } from './AppShell';
import {
  HOME_DESTINATION,
  MESSAGE_LIST_DESTINATION,
  MESSAGES_DESTINATION,
  RSVP_DESTINATION,
  THE_HALF_MILE_DESTINATION,
} from '../shared/constants/navigation.constants';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path={HOME_DESTINATION.route} element={<HomePage />} />
          <Route path={THE_HALF_MILE_DESTINATION.route} element={<HalfMilePage />} />
          <Route path={RSVP_DESTINATION.route} element={<GuestListPage />} />
          <Route path={MESSAGES_DESTINATION.route} element={<MessagesPage />} />
          <Route path={MESSAGE_LIST_DESTINATION.route} element={<MessagesPage />} />
          <Route path="/guest-list" element={<Navigate to={RSVP_DESTINATION.route} replace />} />
          <Route path="*" element={<Navigate to={HOME_DESTINATION.route} replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
