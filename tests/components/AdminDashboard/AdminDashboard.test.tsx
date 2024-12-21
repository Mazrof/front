// import AdminDashboard from "@/components/AdminDashboard";
// import { render, screen } from "@testing-library/react";
// import { GetUsers, GetGroups, FilterandRemovefilter, BanandUnban } from "@/services/AdminDashboard";

// // Mocking services
// jest.mock("@/services/AdminDashboard", () => ({
//     GetUsers: jest.fn(),
//     GetGroups: jest.fn(),
//     FilterandRemovefilter: jest.fn(),
//     BanandUnban: jest.fn(),
// }));

// describe("AdminDashboard", () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it("renders the AdminDashboard component", () => {
//         render(<AdminDashboard />);
//         expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
//     });

//     it("fetches and displays users and groups on mount", async () => {
//         const mockUsers = [{ id: "1", username: "John", email: "john@example.com", status: true }];
//         const mockGroups = [
//             {
//                 id: "1",
//                 community: { name: "Group1", privacy: false },
//                 groupSize: 10,
//                 hasFilter: false,
//             },
//         ];

//         (GetUsers as jest.Mock).mockResolvedValue({
//             status: "success",
//             data: { users: mockUsers },
//         });
//         (GetGroups as jest.Mock).mockResolvedValue({
//             status: "success",
//             data: { groups: mockGroups },
//         });

//         render(<AdminDashboard />);

//         await waitFor(() => {
//             expect(screen.getByText("John")).toBeInTheDocument();
//             expect(screen.getByText("Group1")).toBeInTheDocument();
//         });
//     });

//     it("filters and displays active users by default", async () => {
//         const mockUsers = [
//             { id: "1", username: "John", email: "john@example.com", status: true },
//             { id: "2", username: "Doe", email: "doe@example.com", status: false },
//         ];

//         (GetUsers as jest.Mock).mockResolvedValue({
//             status: "success",
//             data: { users: mockUsers },
//         });

//         render(<AdminDashboard />);

//         await waitFor(() => {
//             expect(screen.getByText("John")).toBeInTheDocument();
//             expect(screen.queryByText("Doe")).not.toBeInTheDocument();
//         });
//     });

//     it("bans a user and updates the UI", async () => {
//         const mockUsers = [{ id: "1", username: "John", email: "john@example.com", status: true }];

//         (GetUsers as jest.Mock).mockResolvedValue({
//             status: "success",
//             data: { users: mockUsers },
//         });
//         (BanandUnban as jest.Mock).mockResolvedValue({});

//         render(<AdminDashboard />);

//         await waitFor(() => {
//             expect(screen.getByText("John")).toBeInTheDocument();
//         });

//         const banButton = screen.getByText("Ban User");
//         fireEvent.click(banButton);

//         await waitFor(() => {
//             expect(screen.getByText("Unban User")).toBeInTheDocument();
//         });
//     });

//     it("toggles group filter and updates the UI", async () => {
//         const mockGroups = [
//             {
//                 id: "1",
//                 community: { name: "Group1", privacy: false },
//                 groupSize: 10,
//                 hasFilter: false,
//             },
//         ];

//         (GetGroups as jest.Mock).mockResolvedValue({
//             status: "success",
//             data: { groups: mockGroups },
//         });
//         (FilterandRemovefilter as jest.Mock).mockResolvedValue({});

//         render(<AdminDashboard />);

//         await waitFor(() => {
//             expect(screen.getByText("Group1")).toBeInTheDocument();
//         });

//         const filterButton = screen.getByText("Apply Filter");
//         fireEvent.click(filterButton);

//         await waitFor(() => {
//             expect(screen.getByText("Remove Filter")).toBeInTheDocument();
//         });
//     });
// });
