/* eslint-disable react-refresh/only-export-components */
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppShell } from '../../src/app/AppShell';
import { HalfMilePage } from '../../src/pages/HalfMilePage/HalfMilePage';
import {
  HOME_ROUTE,
  THE_HALF_MILE_ROUTE,
} from '../../src/shared/constants/navigation.constants';

interface RenderHalfMileShellOptions {
  initialRoute?: string;
}

function LocationDisplay() {
  const { pathname } = useLocation();
  return <output data-testid="location-display">{pathname}</output>;
}

export function renderHalfMileShell(options: RenderHalfMileShellOptions = {}) {
  const { initialRoute = THE_HALF_MILE_ROUTE } = options;

  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppShell>
        <Routes>
          <Route path={HOME_ROUTE} element={<h1>Home Page</h1>} />
          <Route path={THE_HALF_MILE_ROUTE} element={<HalfMilePage />} />
        </Routes>
        <LocationDisplay />
      </AppShell>
    </MemoryRouter>,
  );
}

export function renderHalfMilePageOnly() {
  return render(
    <MemoryRouter initialEntries={[THE_HALF_MILE_ROUTE]}>
      <Routes>
        <Route path={THE_HALF_MILE_ROUTE} element={<HalfMilePage />} />
      </Routes>
    </MemoryRouter>,
  );
}
