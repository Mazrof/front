"use client";
type InfoProp = {
    prop: {
        infoType: string;
        infoContent: string | undefined;
        icon: React.ReactNode;
        dataTest: string;
    };
};
function DisplayInfo({ prop }: InfoProp) {
    return (
        prop.infoContent && (
            <div className="flex w-full items-center gap-8">
                <div data-testid="icon">{prop?.icon}</div>

                <div className="flex flex-col items-start justify-center">
                    <h2 data-test={prop.dataTest}>{prop?.infoContent}</h2>
                    <h3 className="text-gray-500">{prop?.infoType}</h3>
                </div>
            </div>
        )
    );
}

export default DisplayInfo;
