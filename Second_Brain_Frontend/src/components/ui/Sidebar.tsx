import { BrainIcon } from "../../icons/BrainIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return <div className="h-screen bg-white border-0 w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-4 items-center">
                <div className="pr-2 text-purple-600">
                    <BrainIcon />
                </div>
                Brainly
            </div>
        <div className="pt-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon />}/>
            <SidebarItem text="Youtube" icon={<YoutubeIcon />}/>
        </div>
    </div>
}