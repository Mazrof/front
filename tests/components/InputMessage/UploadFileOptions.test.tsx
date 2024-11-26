import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import UploadFilesOption from "@/components/Chats/InputMessage/UploadFileOptions";
const testFile = new File(["file content"], "test-file.txt", {
    type: "text/plain",
});
const isOpenMock = jest.fn();
const compressMediaMock = jest.fn().mockReturnValue(testFile);
const isAllowedFileSizeMock = jest.fn();
const convertFileMock = jest.fn();
jest.mock("../../../store/inputMessage", () => ({
    ...jest.requireActual("../../../store/inputMessage"), // Keep all real functions from inputMessage
    useOpenAlert: () => ({ setIsOpenAlert: isOpenMock }),
}));
jest.mock("../../../utils/inputMessage", () => ({
    ...jest.requireActual("../../../utils/inputMessage"), // Keep all real functions from inputMessage
    compressMedia: () => compressMediaMock(),
    isAllowedFileSize: () => isAllowedFileSizeMock(),
    convertFileToImageVideo: () => convertFileMock(),
}));
describe("Upload File Options", () => {
    beforeEach(() => {
        compressMediaMock.mockReset();
        isOpenMock.mockReset();
        isAllowedFileSizeMock.mockReset();
        convertFileMock.mockReset();
    });
    describe("Render", () => {
        it("should render Compress Media field ", () => {
            render(<UploadFilesOption />);
            const compressMediaFiled = screen.getByTestId("Compress Media");
            expect(compressMediaFiled).toBeInTheDocument();
        });
        it("should render Photo or Video field ", () => {
            render(<UploadFilesOption />);
            const photoOrVideo = screen.getByTestId("Photo or Video");
            expect(photoOrVideo).toBeInTheDocument();
        });
        it("should render Document field ", () => {
            render(<UploadFilesOption />);
            const document = screen.getByTestId("Document");
            expect(document).toBeInTheDocument();
        });
    });
    describe("Functionality", () => {
        it("should call setIsOpenAlert with true value when choose compress media", async () => {
            render(<UploadFilesOption />);
            const compressMediaField = screen.getByTestId("Compress Media");
            fireEvent.change(compressMediaField, {
                target: { files: [testFile] },
            });
            await waitFor(() => {
                expect(isOpenMock).toHaveBeenCalledWith(true);
            });
        });

        it("should call compress function  when choose compress media", async () => {
            render(<UploadFilesOption />);
            compressMediaMock.mockReturnValue(testFile);
            const compressMediaField = screen.getByTestId("Compress Media");
            fireEvent.change(compressMediaField, {
                target: { files: [testFile] },
            });
            await waitFor(() => {
                expect(compressMediaMock).toHaveBeenCalledTimes(1);
            });
        });
        it("should call setOpenAlert with true value if isAllowedFileSize is false", async () => {
            isAllowedFileSizeMock.mockReturnValue(false);
            compressMediaMock.mockReturnValue(testFile);
            render(<UploadFilesOption />);
            const compressMediaField = screen.getByTestId("Compress Media");
            fireEvent.change(compressMediaField, {
                target: { files: [testFile] },
            });
            await waitFor(() => {
                expect(isOpenMock).toHaveBeenCalledTimes(2);
            });
        });
        it("shouldnot call setIsOpenAlert if isAllowedFileSize is true", async () => {
            isAllowedFileSizeMock.mockReturnValue(true);
            compressMediaMock.mockReturnValue(testFile);

            render(<UploadFilesOption />);
            const compressMediaField = screen.getByTestId("Compress Media");
            fireEvent.change(compressMediaField, {
                target: { files: [testFile] },
            });
            await waitFor(() => {
                expect(isOpenMock).toHaveBeenCalledTimes(1);
            });
        });
        it("should call convertFileToImageVideo if isAllowedFileSize is true", async () => {
            isAllowedFileSizeMock.mockReturnValue(true);
            compressMediaMock.mockReturnValue(testFile);
            render(<UploadFilesOption />);
            const compressMediaField = screen.getByTestId("Compress Media");
            fireEvent.change(compressMediaField, {
                target: { files: [testFile] },
            });
            await waitFor(() => {
                expect(convertFileMock).toHaveBeenCalledTimes(1);
            });
        });
    });
});
