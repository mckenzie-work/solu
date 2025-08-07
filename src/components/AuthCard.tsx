import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  title?: string;
  logo?: ReactNode;
  children: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, logo, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-accent/20 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          {logo && <div className="flex justify-center">{logo}</div>}
          {title && (
            <CardTitle className="text-2xl font-bold text-foreground">
              {title}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;