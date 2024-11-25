import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import DetailsInfo from "./DetailsInfo";

export default function MainInfo() {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="my-2 flex w-full items-center justify-start py-2">
                <Button variant={"ghost"} className="m-0 w-12 px-4">
                    <X />
                </Button>
                <h2 className="pl-6 align-middle text-2xl font-semibold"> Group Info</h2>
            </div>
            <div className="relative mx-auto max-h-[300px] w-full max-w-sm">
                <Image
                    src="https://static01.nyt.com/images/2019/11/03/arts/03mrrobot-recap/merlin_163529514_176f6520-229e-40bb-bd44-964a371adf2f-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
                    alt="profile"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end px-4 py-2 text-white">
                    <p className="text-lg font-bold">Internships Discussion</p>
                    <h4 className="mt-1 text-sm font-medium">2 031 members</h4>
                </div>
            </div>
            <DetailsInfo />
        </div>
    );
}
