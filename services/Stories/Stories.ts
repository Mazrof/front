/* eslint-disable @typescript-eslint/no-unused-vars */
import apiHandler from "@/lib/apiHandler";
import { ApiRequest } from "@/types/request";

export async function getStories() {
    // const image ="data:image/jpeg;base64,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"
    const request: ApiRequest = {
        endpoint: `${process.env.NEXT_SERVER_IP}api/v1/stories`,
        method: "GET",
        cache: "no-store", // Avoid caching
        credentials: "include",
    };
    return await apiHandler(request);
//     return {
//         "status": "success",
//         "data": {
//             "allFriendsStories": [
//                 {
//                     "username": "kirobaghdad",
//                     "screenName": null,
//                     // "photo": image,
//                     "photo":null,
//                     "profilePicVisibility": "everyone",
//                     "storyVisibility": "everyone",
//                     "stories": [
//                         {
//                             "id": 11,
//                             "userId": 7,
//                             "content": "This is my first story user 7",
//                             "createdAt": "2024-12-19T15:47:01.149Z",
//                             "expiryDate": "2024-12-20T15:47:00.350Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 12,
//                             "userId": 7,
//                             "content": "This is my first story user 7",
//                             "createdAt": "2024-12-19T15:47:02.948Z",
//                             "expiryDate": "2024-12-20T15:47:02.354Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 13,
//                             "userId": 7,
//                             "content": "This is my first story user 7",
//                             "createdAt": "2024-12-19T15:47:04.384Z",
//                             "expiryDate": "2024-12-20T15:47:03.807Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 14,
//                             "userId": 7,
//                             "content": "This is my first story user 7",
//                             "createdAt": "2024-12-19T15:47:05.776Z",
//                             "expiryDate": "2024-12-20T15:47:05.193Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         }
//                     ]
//                 },
//                 {
//                     "username": "abdo123",
//                     "screenName": null,
//                     "photo": null,
//                     "profilePicVisibility": "everyone",
//                     "storyVisibility": "everyone",
//                     "stories": [
//                         {
//                             "id": 3,
//                             "userId": 5,
//                             "content": "This is my first story",
//                             "createdAt": "2024-12-19T15:45:55.744Z",
//                             "expiryDate": "2024-12-20T15:45:54.900Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 4,
//                             "userId": 5,
//                             "content": "This is my first story",
//                             "createdAt": "2024-12-19T15:45:57.532Z",
//                             "expiryDate": "2024-12-20T15:45:56.944Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 5,
//                             "userId": 5,
//                             "content": "This is my first story",
//                             "createdAt": "2024-12-19T15:45:59.153Z",
//                             "expiryDate": "2024-12-20T15:45:58.516Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 6,
//                             "userId": 5,
//                             "content": "This is my first story user 5",
//                             "createdAt": "2024-12-19T15:46:05.550Z",
//                             "expiryDate": "2024-12-20T15:46:04.874Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         }
//                     ]
//                 },
//                 {
//                     "username": "maken",
//                     "screenName": null,
//                     "photo": null,
//                     "profilePicVisibility": "everyone",
//                     "storyVisibility": "everyone",
//                     "stories": [
//                         {
//                             "id": 15,
//                             "userId": 9,
//                             "content": "This is my first story user 9",
//                             "createdAt": "2024-12-19T15:47:14.470Z",
//                             "expiryDate": "2024-12-20T15:47:13.637Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 16,
//                             "userId": 9,
//                             "content": "This is my first story user 9",
//                             "createdAt": "2024-12-19T15:47:16.025Z",
//                             "expiryDate": "2024-12-20T15:47:15.425Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 17,
//                             "userId": 9,
//                             "content": "This is my first story user 9",
//                             "createdAt": "2024-12-19T15:47:17.491Z",
//                             "expiryDate": "2024-12-20T15:47:16.855Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 18,
//                             "userId": 9,
//                             "content": "This is my first story user 9",
//                             "createdAt": "2024-12-19T15:47:18.730Z",
//                             "expiryDate": "2024-12-20T15:47:18.153Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         }
//                     ]
//                 },
//                 {
//                     "username": "abdso123",
//                     "screenName": null,
//                     "photo": null,
//                     "profilePicVisibility": "everyone",
//                     "storyVisibility": "everyone",
//                     "stories": [
//                         {
//                             "id": 7,
//                             "userId": 18,
//                             "content": "This is my first story user 18",
//                             "createdAt": "2024-12-19T15:46:28.549Z",
//                             "expiryDate": "2024-12-20T15:46:27.731Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 8,
//                             "userId": 18,
//                             "content": "This is my first story user 18",
//                             "createdAt": "2024-12-19T15:46:30.287Z",
//                             "expiryDate": "2024-12-20T15:46:29.667Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 9,
//                             "userId": 18,
//                             "content": "This is my first story user 18",
//                             "createdAt": "2024-12-19T15:46:31.903Z",
//                             "expiryDate": "2024-12-20T15:46:31.282Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         },
//                         {
//                             "id": 10,
//                             "userId": 18,
//                             "content": "This is my first story user 18",
//                             "createdAt": "2024-12-19T15:46:33.388Z",
//                             "expiryDate": "2024-12-20T15:46:32.812Z",
//                             "mediaType": "photo",
//                             "color": "black",
//                             "viewCount": 1,
//                             "StoryMedia": "base 64"
//                             // "StoryMedia":image
//                         }
//                     ]
//                 }
//             ]
//         }
//     }
}
export async function sendStory(storyData: {
    content: string;
    mediaType: string;
    color: string;
    storyMedia?: string;
}) {
    const request: ApiRequest = {
        endpoint: `${process.env.NEXT_SERVER_IP}api/v1/stories`,
        method: "POST",
        cache: "no-store",
        credentials: "include",
        body: JSON.stringify(storyData),
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await apiHandler(request);
}

