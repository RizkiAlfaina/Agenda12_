import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, BookUser, Database, Home, ScrollText } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

export default function NavbarWeb() {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    function homeClick() {
        setActiveItem('/');
        window.location.replace("/");
    }

    const isActive = (path) => activeItem === path;

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-17 items-center border-b px-4 lg:h-[140px] lg:px-6">
                    <div onClick={homeClick} className="flex flex-col items-start gap-2 font-semibold cursor-pointer">
                        <img
                            src="/login.jpg"
                            alt="Image"
                            width="180"
                            height="180"
                        />
                        <b className="text-xs font-bold">Terminal Agendas System</b>
                    </div>

                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <div
                            onClick={homeClick}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer mb-4 mt-4 ${isActive('/') ? 'bg-gray-500 text-white' : 'text-muted-foreground hover:bg-gray-300'}`}
                        >
                            <Home className="h-4 w-4" />
                            Home
                        </div>
                        <Link
                            to="/dashboard"
                            onClick={() => setActiveItem('/dashboard')}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer mb-4 ${isActive('/dashboard') ? 'bg-gray-500 text-white' : 'text-muted-foreground hover:bg-gray-300'}`}
                        >
                            <RxDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            to="/agenda"
                            onClick={() => setActiveItem('/agenda')}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer mb-4 ${isActive('/agenda') ? 'bg-gray-500 text-white' : 'text-muted-foreground hover:bg-gray-300'}`}
                        >
                            <ScrollText className="h-4 w-4" />
                            Agenda
                        </Link>
                        <Link
                            to="/disposisi"
                            onClick={() => setActiveItem('/disposisi')}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer mb-4 ${isActive('/disposisi') ? 'bg-gray-500 text-white' : 'text-muted-foreground hover:bg-gray-300'}`}
                        >
                            <Database className="h-4 w-4" />
                            Master Data
                        </Link>
                        <Link
                            to="/users"
                            onClick={() => setActiveItem('/users')}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer mb-4 ${isActive('/users') ? 'bg-gray-500 text-white' : 'text-muted-foreground hover:bg-gray-300'}`}
                        >
                            <BookUser className="h-4 w-4" />
                            Users
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}





{/* <AccordionItem value="item-4" className="border-none">
                            <AccordionTrigger className="hover:text-primary hover:no-underline">
                                <span className="flex items-center gap-3">
                                    <BookUser className="h-4 w-4" />
                                    Users
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                   
                                    <Link
                                        to={"#"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary "
                                    >
                                      
                                        Employee
                                    </Link>
                                    <Link
                                        to={"#"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary "
                                    >
                                      
                                        Role
                                    </Link>

                                </nav>
                            </AccordionContent>
                        </AccordionItem> */}