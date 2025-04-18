'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function MainNav({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const routes = [
    {href:'/', label:'Home'},
    { href: `/admin`, label: 'Overview' },
    {href:`/admin/offer`,label:'Offers'},
    {href:'/admin/announcement',label:'Announcement'},
    { href: `/admin/crops`, label: 'Crops' },
    { href: `/admin/billboards`, label: 'Billboards' },
    { href: `/admin/categories`, label: 'Categories' },
    { href: `/admin/subcategories`, label: 'Sub-Categories' },
    { href: `/admin/specifications`, label: 'Specifications' },
    { href: `/admin/products`, label: 'Products' },
    { href: `/admin/orders`, label: 'Orders' },
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => {
        const isActive = pathname === route.href;

        return (
          <motion.div
            key={route.href}
            whileHover={{
              scale: 1.1,
              background: 'linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)',
              transition: { type: 'spring', stiffness: 300 },
            }}
            className="rounded-lg"
          >
            <Link
              href={route.href}
              className={cn(
                'text-sm font-medium px-3 py-1 rounded-lg transition-colors',
                isActive
                  ? 'text-yellow-300 font-bold '
                  : 'text-muted-foreground'
              )}
            >
              {route.label}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
