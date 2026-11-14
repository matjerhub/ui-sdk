import React from 'react';
import { WorkspaceSelector, Workspace } from './WorkspaceSelector.js';
import { NotificationsArea, Notification } from './NotificationsArea.js';
import { UserMenu, UserMenuProps } from './UserMenu.js';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs.js';
import { Button } from '../components/Button.js';

export interface TopNavigationProps {
  breadcrumbsItems?: BreadcrumbItem[];
  workspaces?: Workspace[];
  activeWorkspaceId?: string;
  onWorkspaceChange?: (id: string) => void;
  notifications?: Notification[];
  user?: UserMenuProps['user'];
  onSignOut?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  dir?: 'ltr' | 'rtl';
  onToggleDir?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  breadcrumbsItems = [{ label: 'Dashboard', href: '/' }],
  workspaces,
  activeWorkspaceId,
  onWorkspaceChange,
  notifications,
  user,
  onSignOut,
  onProfileClick,
  onSettingsClick,
  dir = 'ltr',
  onToggleDir,
  theme = 'dark',
  onToggleTheme,
  searchValue = '',
  searchPlaceholder = 'Search',
  onSearchChange,
}) => {
  return (
    <header
      style={{
        height: '60px',
        padding: '0 24px',
        backgroundColor: 'var(--color-card)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 750,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Breadcrumbs items={breadcrumbsItems} />
        {onSearchChange && (
          <label style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 'min(320px, 30vw)' }}>
            <span aria-hidden="true" style={{ position: 'absolute', insetInlineEnd: '10px', color: 'var(--color-muted-foreground)' }}>⌕</span>
            <input
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              style={{ width: '100%', height: '36px', padding: '0 34px 0 12px', border: 0, borderRadius: '8px', background: 'var(--color-muted)', color: 'var(--color-foreground)', font: 'inherit', outline: 'none' }}
            />
          </label>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <WorkspaceSelector
          workspaces={workspaces}
          activeWorkspaceId={activeWorkspaceId}
          onWorkspaceChange={onWorkspaceChange}
        />

        {onToggleDir && (
          <Button size="sm" variant="ghost" onClick={onToggleDir} aria-label="Toggle Direction">
            {dir.toUpperCase()}
          </Button>
        )}

        {onToggleTheme && (
          <Button size="sm" variant="ghost" onClick={onToggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? '🌙' : '☀️'}
          </Button>
        )}

        <NotificationsArea notifications={notifications} />

        <UserMenu 
          user={user} 
          onSignOut={onSignOut}
          onProfileClick={onProfileClick}
          onSettingsClick={onSettingsClick}
        />
      </div>
    </header>
  );
};
