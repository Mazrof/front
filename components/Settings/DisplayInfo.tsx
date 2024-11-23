"use client";
type InfoProp = {
    prop: {
        infoType: string;
        infoContent: string | undefined;
        icon: React.ReactNode;
    };
};
function DisplayInfo({ prop }: InfoProp) {
    return (
        prop.infoContent && (
            <div className="flex items-center gap-8 w-full ">
                {prop?.icon}

                <div className="flex flex-col items-start justify-center">
                    <h2>{prop?.infoContent}</h2>
                    <h3 className="text-gray-500">{prop?.infoType}</h3>
                </div>
            </div>
        )
    );
}

export default DisplayInfo;
