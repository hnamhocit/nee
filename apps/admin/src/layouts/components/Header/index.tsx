import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {BellIcon, ChevronDownIcon} from "lucide-react";

export default function Header() {
    return <header
        className='sticky top-0 left-0 px-4 w-full z-20 bg-white flex items-center justify-between h-16 border-b-2 border-slate-200'>
        <Input placeholder="Search..." className='max-w-64'/>

        <div className="flex items-center gap-4">
            <Button size="icon" variant="outline">
                <BellIcon/>
            </Button>

            <Button variant="outline">
                <div className="font-medium">🇮🇪 Ireland</div>
                <ChevronDownIcon/>
            </Button>

            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage
                        src='https://static.foxbusiness.com/foxbusiness.com/content/uploads/2024/10/ferrari9.jpg'/>
                    <AvatarFallback>HN</AvatarFallback>
                </Avatar>

                <div>
                    <div className="text-sm font-bold">Hoang Nam</div>
                    <div className="text-xs font-medium text-blue-500">Admin</div>
                </div>
            </div>


        </div>
    </header>
}