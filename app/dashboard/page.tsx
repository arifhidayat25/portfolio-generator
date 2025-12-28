"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Portfolio } from '@/lib/supabase';
import { PortfolioCard } from '@/components/dashboard/portfolio-card';
import Link from 'next/link';

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchPortfolios();
  }, []);

  async function checkAuth() {
    console.log('[Dashboard] Checking auth...');
    const currentUser = await authService.getCurrentUser();
    console.log('[Dashboard] Current user:', currentUser);
    
    if (!currentUser) {
      console.log('[Dashboard] No user found, redirecting to login');
      router.push('/login');
      return;
    }
    console.log('[Dashboard] User authenticated:', currentUser.email);
    setUser(currentUser);
  }

  async function fetchPortfolios() {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) return;

      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolios(data || []);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus portfolio ini?')) return;

    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from state
      setPortfolios(portfolios.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      alert('Gagal menghapus portfolio');
    }
  }

  async function handleTogglePublic(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('portfolios')
        .update({ is_public: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      // Update state
      setPortfolios(portfolios.map(p => 
        p.id === id ? { ...p, is_public: !currentStatus } : p
      ));
    } catch (error) {
      console.error('Error toggling public status:', error);
      alert('Gagal mengubah status');
    }
  }

  async function handleLogout() {
    await authService.signOut();
    router.push('/');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Halo, {user?.email || 'User'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/quick-generate">
                <Button variant="outline">Quick Generate</Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Saya</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Kelola semua portfolio Anda di satu tempat
            </p>
          </div>
          <Link href="/create-portfolio">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Buat Portfolio Baru
            </Button>
          </Link>
        </div>

        {portfolios.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Belum Ada Portfolio</CardTitle>
              <CardDescription>
                Mulai dengan membuat portfolio pertama Anda!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/create-portfolio">
                <Button>
                  <Plus className="mr-2 h-5 w-5" />
                  Buat Portfolio Pertama
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                onDelete={handleDelete}
                onTogglePublic={handleTogglePublic}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
