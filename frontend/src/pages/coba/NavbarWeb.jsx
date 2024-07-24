import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Bell, BookUser, Database, Home, ScrollText } from 'lucide-react'
import { Link, useNavigation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

export default function NavbarWeb() {

    function homeClick() {
        window.location.replace("/");
    }
    return (<div className="hidden border-r bg-muted/40 md:block">
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
                    <Accordion type="single" collapsible className=" rounded-lg px-3 py-2 text-muted-foreground transition-all ">
                        <div
                            onClick={homeClick} 
                            className="flex items-center gap-3 rounded-lg text-muted-foreground transition-all hover:text-primary cursor-pointer mb-4 mt-4"
                            >
                            <Home className="h-4 w-4" />
                            Home
                        </div>
                        <AccordionItem value="item-1" className="border-none">
                            <AccordionTrigger className="hover:text-primary hover:no-underline">
                                <span className="flex items-center gap-3">
                                    <RxDashboard className="h-4 w-4" />
                                    Dashboard
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                    
                                    <Link
                                        to={"/dashboard"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all text-primary hover:text-primary bg-muted"
                                    >

                                        OnGoing
                                    </Link>
                                    {/* <Link
                                        to={"/inventory-status"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary "
                                    >

                                        Invetory Status
                                    </Link> */}
                                </nav>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-none">
                            <AccordionTrigger className="hover:text-primary hover:no-underline ">
                                <span className="flex items-center gap-3">
                                    <ScrollText className="h-4 w-4" />
                                    Agenda
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                    <Link
                                        to={"/agenda"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground  transition-all hover:text-primary"
                                    >
                                        {/* <Home className="h-4 w-4" /> */}
                                        Agenda List
                                    </Link>
                                    
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
                                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                    <Link
                                        to={"/disposisi"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        {/* <Home className="h-4 w-4" /> */}
                                        Disposisi
                                    </Link>
                                    {/* <Link
                                        to={"/lokasi"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary "
                                    >
                                        Lokasi Rapat
                                    </Link> */}
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
                                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                    <Link
                                        to={"#"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        {/* <Home className="h-4 w-4" /> */}
                                        Terminal
                                    </Link>
                                    <Link
                                        to={"#"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary "
                                    >
                                        {/* <Home className="h-4 w-4" /> */}
                                        Employee
                                    </Link>
                                    <Link
                                        to={"#"}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary "
                                    >
                                        {/* <Home className="h-4 w-4" /> */}
                                        Role
                                    </Link>

                                </nav>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </nav>
            </div>

        </div>
    </div>)
}