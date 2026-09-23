// app/admin/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Users, Phone, TrendingUp, Zap } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalCalls: number;
  totalDuration: number;
  totalCreditsUsed: number;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAnalytics();
    }
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <Link href="/login">
          <Button>Please sign in</Button>
        </Link>
      </div>
    );
  }

  if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <Card glass className="text-center space-y-4">
          <p className="text-red-400 font-semibold">Access Denied</p>
          <p className="text-gray-400">You don&apos;t have permission to access this page</p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link href="/dashboard">
            <Button variant="ghost">Back to App</Button>
          </Link>
        </div>
      </header>

      {/* Analytics */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading analytics...</p>
          </div>
        ) : analytics ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-blue-400">{analytics.totalUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </Card>

              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Users</p>
                    <p className="text-3xl font-bold text-green-400">{analytics.activeUsers}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </Card>

              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Calls</p>
                    <p className="text-3xl font-bold text-purple-400">{analytics.totalCalls}</p>
                  </div>
                  <Phone className="w-8 h-8 text-purple-500" />
                </div>
              </Card>

              <Card glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Credits Used</p>
                    <p className="text-3xl font-bold text-orange-400">
                      ${analytics.totalCreditsUsed.toFixed(2)}
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
              </Card>
            </div>

            <Card glass>
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Platform Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Call Duration</span>
                    <span className="font-semibold">
                      {Math.floor(analytics.totalDuration / 3600)} hours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Calls per User</span>
                    <span className="font-semibold">
                      {(analytics.totalCalls / Math.max(analytics.totalUsers, 1)).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue Generated</span>
                    <span className="font-semibold text-green-400">
                      ${(analytics.totalCreditsUsed * 0.7).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <Card glass className="text-center py-12">
            <p className="text-gray-400">Failed to load analytics</p>
          </Card>
        )}
      </main>
    </div>
  );
}
