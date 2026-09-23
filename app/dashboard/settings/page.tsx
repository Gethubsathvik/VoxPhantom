// app/dashboard/settings/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Shield, Bell } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    callRecording: false,
    privacyMode: false,
    twoFactorEnabled: false,
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <Link href="/login">
          <Button>Please sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Link href="/dashboard">
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Settings Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Account Settings */}
          <Card glass>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Account Information</h2>
                <p className="text-gray-400">Manage your account details</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={user.firstName || ''}
                  disabled
                />
                <Input
                  label="Last Name"
                  value={user.lastName || ''}
                  disabled
                />
              </div>

              <Input
                label="Email Address"
                value={user.email}
                disabled
              />

              <Button>Change Password</Button>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card glass>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  <Bell className="w-5 h-5 inline mr-2" />
                  Notifications
                </h2>
                <p className="text-gray-400">Control how we contact you</p>
              </div>

              <label className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <div>
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive email updates about your account</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <div>
                  <p className="font-medium text-white">Call Recording</p>
                  <p className="text-sm text-gray-400">Record your calls automatically</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.callRecording}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      callRecording: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded"
                />
              </label>

              <Button>Save Preferences</Button>
            </div>
          </Card>

          {/* Security Settings */}
          <Card glass>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  <Shield className="w-5 h-5 inline mr-2" />
                  Security
                </h2>
                <p className="text-gray-400">Keep your account secure</p>
              </div>

              <label className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <div>
                  <p className="font-medium text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-400">Add an extra layer of security</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.twoFactorEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      twoFactorEnabled: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded"
                />
              </label>

              <Button>Enable 2FA</Button>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card glass>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h2>
                <p className="text-gray-400">Irreversible and destructive actions</p>
              </div>

              <Button variant="danger" className="w-full">
                Delete Account Permanently
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
