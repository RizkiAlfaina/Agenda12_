import React, { useState } from 'react';
import { BookUser, Database, Home, KeyRound, LogOut, Menu, ScrollText, Settings, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";

export default function NavbarMobile() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const navigate = useNavigate();
  
  const handleLinkClick = (path) => {
    navigate(path);
    setIsSheetOpen(false); // Menutup Sheet setelah link diklik
  };

  // const handleProfileClick = () => {
  //   navigate('/profile-info');
  //   setSelectedTab(null);
  //   setIsDropdownOpen(false); // Close the entire dropdown menu
  // };

  const handleResetPasswordClick = () => {
    navigate('/setting');
    setSelectedTab(null);
    setIsDropdownOpen(false); // Close the entire dropdown menu
  };

  function handleClick() {
    window.location.replace('/');
  }

  function homeClick() {
    window.location.replace("/");
  } 

  function getTime() {
    const now = new Date();
    const time = now.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return time;
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden" onClick={() => setIsSheetOpen(!isSheetOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium px-3 py-2">
            <div
              onClick={homeClick} 
              className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
              <Home className="h-4 w-4" />
              Home
            </div>
            <Accordion type="single" collapsible value={activeAccordion} onValueChange={setActiveAccordion} className="rounded-lg text-muted-foreground transition-all">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="hover:text-primary hover:no-underline">
                  <span className="flex items-center gap-3">
                    <RxDashboard className="h-4 w-4" />
                    Dashboard
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="grid items-start text-sm font-medium lg:px-4">
                    <span onClick={() => handleLinkClick('/dashboard')} className="flex items-center gap-3 rounded-lg px-7 py-1 text-muted-foreground transition-all hover:text-primary bg-muted cursor-pointer">
                      OnGoing
                    </span>
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="hover:text-primary hover:no-underline">
                  <span className="flex items-center gap-3">
                    <ScrollText className="h-4 w-4" />
                    Agenda
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="grid items-start text-sm font-medium lg:px-4">
                    <span onClick={() => handleLinkClick('/agenda')} className="flex items-center gap-3 rounded-lg px-7 py-1 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                      Agenda List
                    </span>
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="hover:text-primary hover:no-underline">
                  <span className="flex items-center gap-3">
                    <Database className="h-4 w-4" />
                    Master Data
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="grid items-start text-sm font-medium lg:px-4">
                    <span onClick={() => handleLinkClick('/disposisi')} className="flex items-center gap-3 rounded-lg px-7 py-1 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                      Disposisi
                    </span>
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-none">
                <AccordionTrigger className="hover:text-primary hover:no-underline">
                  <span className="flex items-center gap-3">
                    <BookUser className="h-4 w-4" />
                    Users
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <nav className="grid items-start text-sm font-medium lg:px-4">
                    <span onClick={() => handleLinkClick('/terminal')} className="flex items-center gap-3 rounded-lg px-7 py-1 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                      Terminal
                    </span>
                    <span onClick={() => handleLinkClick('/employee')} className="flex items-center gap-3 rounded-lg px-7 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                      Employee
                    </span>
                    <span onClick={() => handleLinkClick('/role')} className="flex items-center gap-3 rounded-lg px-7 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer">
                      Role
                    </span>
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <div>
          {getTime()}
        </div>
      </div>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <Card className="flex flex-row pt-6 w-full h-full items-center content-center justify-center">
              <CardContent className="flex flex-row w-full h-full items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold">Admin</span>
                  <span className="text-muted-foreground text-xs">SYSTEM ADMIN</span>
                </div>
                <Button onClick={handleClick} className="absolute right-10">
                  <LogOut className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="setting" className="gap-2">
                <Link
                  to="/setting"
                  className="text-sm flex items-center gap-3 rounded-lg px-2 py-1 text-muted"
                  onClick={handleResetPasswordClick}
                >
                  <Settings className="h-4 w-4" /> Setting
                </Link>
              </TabsTrigger>
            </TabsList>
            {/* <TabsContent value="profile">
              <Link
                to="/profile-info"
                className="text-sm flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                onClick={handleProfileClick}
              >
                <User className="h-4 w-4" />
                Profile Info
              </Link>
            </TabsContent> */}
            {/* <TabsContent value="setting">
              <Link
                to="/reset-password"
                className="text-sm flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                onClick={handleResetPasswordClick}
              >
                <KeyRound className="h-4 w-4" />
                Reset Password
              </Link>
            </TabsContent> */}
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
