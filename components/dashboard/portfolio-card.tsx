"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Portfolio } from '@/lib/supabase';
import { Edit, Trash2, Eye, Globe, Lock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onDelete: (id: string) => void;
  onTogglePublic: (id: string, currentStatus: boolean) => void;
}

export function PortfolioCard({ portfolio, onDelete, onTogglePublic }: PortfolioCardProps) {
  const publicUrl = portfolio.is_public && portfolio.slug 
    ? `${window.location.origin}/portfolio/${portfolio.slug}`
    : null;

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-1">{portfolio.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-1">
              {portfolio.full_name}
            </CardDescription>
          </div>
          <Badge variant={portfolio.is_public ? 'default' : 'secondary'}>
            {portfolio.is_public ? (
              <>
                <Globe className="mr-1 h-3 w-3" />
                Publik
              </>
            ) : (
              <>
                <Lock className="mr-1 h-3 w-3" />
                Privat
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Template:</span>
            <Badge variant="outline" className="capitalize">
              {portfolio.template_id}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Dilihat:</span>
            <span className="font-medium">{portfolio.view_count}x</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Dibuat:</span>
            <span>{format(new Date(portfolio.created_at), 'dd MMM yyyy', { locale: id })}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <Link href={`/edit-portfolio/${portfolio.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Link href={`/preview/${portfolio.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            onClick={() => onTogglePublic(portfolio.id, portfolio.is_public)}
            className="w-full"
          >
            {portfolio.is_public ? (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Privat
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publik
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDelete(portfolio.id)}
            className="w-full"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus
          </Button>
        </div>

        {/* Public URL */}
        {publicUrl && (
          <div className="w-full pt-2 border-t">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              Lihat Portfolio Publik
            </a>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
