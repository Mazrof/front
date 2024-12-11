import userData from "../../fixtures/users.json";
import chats from "../../fixtures/chats.json";
import stories from "../../fixtures/stories.json";
describe("Home Page", () => {
    beforeEach(() => {
        cy.loginByApi(userData.email.valid, userData.password.valid).then((user) => {
            cy.wrap(user).as("user");
        });
        cy.visit("/");
    });
    context("Side Bar", () => {
        // beforeEach(() => {});
        it("Validate all components exist", () => {
            // cy.visit("/login");
            cy.getBySel("sidebar-logoPicture").should("be.visible");
            cy.getBySel("sidebar-logoName").should("be.visible");
            cy.getBySel("sidebar-searchbar").should("be.visible");
            cy.getBySel("sidebar-menuButton").should("be.visible").click();
            cy.getBySel("sidebar-settings").click();

            // Check go to personal settings
            cy.getBySel("sidebar-settings-devices").should("be.visible");
        });
    });
    context("New Chat Button", () => {
        beforeEach(() => {
            cy.getBySel("newChatButton").should("not.be.visible");
            // should cursor hover sidebar to be visible
            cy.getBySel("sidebar").trigger("mouseover"); // Hover over the sidebar
            cy.getBySel("newChatButton").should("exist").click();
        });

        it("Validate all components exist", () => {
            cy.getBySel("newChatButton-channel").should("be.visible");
            cy.getBySel("newChatButton-group").should("be.visible");
            cy.getBySel("newChatButton-message").should("be.visible");
        });
        it("Validate create channel", () => {
            cy.getBySel("newChatButton-channel").click();
            cy.getBySel("channel-name").invoke("val", chats.channels.name.valid);
            cy.getBySel("channel-privacy-private")
                .click()
                .should("have.attr", "aria-checked", "true");
            cy.getBySel("channel-name-error", { timeout: 0 }).should("not.exist");
            cy.getBySel("channel-canAddComments")
                .should("not.be.checked")
                .click()
                .should("have.attr", "aria-checked", "true");

            cy.getBySel("channel-selectAdmins")
                .first()
                .click()
                .should("have.attr", "aria-checked", "true");
            cy.getBySel("channel-selectAdmins")
                .last()
                .click()
                .should("have.attr", "aria-checked", "true");

            cy.getBySel("channel-createButton").click();

            cy.wait(100000);
        });
        it("Validate create group", () => {
            cy.getBySel("newChatButton-group").click();
            cy.getBySel("group-name").invoke("val", chats.groups.name.valid);
            cy.getBySel("group-privacy-private")
                .click()
                .should("have.attr", "aria-checked", "true");
            cy.getBySel("group-name-error", { timeout: 0 }).should("not.exist");
            cy.getBySel("group-canAddComments")
                .should("not.be.checked")
                .click()
                .should("have.attr", "aria-checked", "true");

            cy.getBySel("group-selectAdmins")
                .first()
                .click()
                .should("have.attr", "aria-checked", "true");
            cy.getBySel("group-selectAdmins")
                .last()
                .click()
                .should("have.attr", "aria-checked", "true");

            cy.getBySel("group-createButton").click();

            cy.wait(100000);
        });
        it("Validate create group", () => {
            cy.getBySel("newChatButton-channel").click();
        });
        it("Validate create message", () => {
            cy.getBySel("newChatButton-channel").click();
        });
    });
    context("Chat List", () => {
        beforeEach(() => {});
        it("Validate all components exist", () => {
            cy.getBySel("chatList-chat")
                .first()
                .find('[data-test="chatList-chat-avatar"]')
                .should("be.visible");

            cy.getBySel("chatList-chat")
                .first()
                .find('[data-test="chatList-chat-name"]')
                .should("be.visible");

            cy.getBySel("chatList-chat")
                .first()
                .find('[data-test="chatList-chat-lastMessage"]')
                .should("be.visible");

            cy.getBySel("chatList-chat")
                .first()
                .find('[data-test="chatList-chat-lastSeen"]')
                .should("be.visible");

            cy.getBySel("chatList-chat")
                .first()
                .find('[data-test="chatList-chat-lastMessageStatus"]')
                .should("be.visible");
        });

        context("Validate chat layout", () => {
            beforeEach(() => {
                cy.wait(1000);
                cy.getBySel("chatList-chat").first().should("be.visible").click({ force: true });
            });
            it("Validate fields presence", () => {
                cy.wait(2000);
                // cy.getBySel("chatList-chatRoom-leftArrowButton").click();
                cy.getBySel("chatList-chatRoom-image").should("be.visible");
                cy.getBySel("chatList-chatRoom-name").should("be.visible");
                cy.getBySel("chatList-chatRoom-lastSeen").should("be.visible");
                cy.getBySel("chatList-chatRoom-videoCallIcon").should("be.visible");
                cy.getBySel("chatList-chatRoom-voiceCallIcon").should("be.visible");
                cy.getBySel("chatList-chatRoom-inputMessage").should("be.visible");
                cy.getBySel("chatList-chatRoom-attachFile").should("be.visible");
                cy.getBySel("chatList-chatRoom-sendMessage", { timeout: 0 }).should("not.exist");

                cy.getBySel("chatList-chatRoom-sendRecording", { timeout: 0 }).should("not.exist");
                cy.getBySel("chatList-chatRoom-deleteRecording", { timeout: 0 }).should(
                    "not.exist"
                );

                cy.getBySel("chatList-chatRoom-startRecording").should("be.visible").click();

                cy.getBySel("chatList-chatRoom-sendRecording").should("be.visible");
                cy.getBySel("chatList-chatRoom-deleteRecording").should("be.visible");

                cy.getBySel("chatList-chatRoom-inputMessage").type("This is a message");

                cy.getBySel("chatList-chatRoom-sendRecording")
                    .should("be.visible")
                    .click({ force: true });

                cy.getBySel("chatList-chatRoom-sendMessage")
                    .should("be.visible")
                    .click({ force: true });

                // cy.getBySel("chatList-chatRoom-sendRecording", { timeout: 0 }).should("not.exist");
            });
            it("validate typing text with emojis", () => {
                cy.getBySel("chatList-chatRoom-inputMessage").type("This is a a joke");
                cy.getBySel("chatList-chatRoom-emojiButton").should("be.visible").click();

                cy.getBySel("chatList-chatRoom-inputMessage").type("😅");

                // cy.get('button[aria-label="😅"]').click();
                // cy.get('button[aria-label="😅"]', { timeout: 10000 }).click();

                cy.get('div[data-id="frequent"]').should("be.visible").click();

                cy.getBySel("chatList-chatRoom-inputMessage").should("have.value", "😅");
            });
        });
    });
    context("Stories scenarios", () => {
        it.only("", () => {
            cy.visit("/");
            cy.getBySel("sidebar-menuButton").should("be.visible").click();
            cy.getBySel("sidebar-stories").click();

            // 1) click on view stories, check no stories
            cy.getBySel("story-view").should("be.visible").click();
            cy.getBySel("story-noStories")
                .should("be.visible")
                .invoke("text")
                .should("eq", "No stories to display.");

            cy.visit("/stories");

            // 2) create two stories
            cy.getBySel("story-create").should("be.visible").click();
            cy.getBySel("story-text").type(stories.first.text || "here");

            cy.get(`button[style="background-color: ${stories.first.color};"]`)
                .should("be.exist")
                .click();

            cy.wait(500);

            cy.getBySel("story-submitButton").should("be.exist").click();

            cy.getBySel("story-create").should("be.visible").click();

            cy.getBySel("story-text").type(stories.first.text || "here");

            cy.get(`button[style="background-color: ${stories.second.color};"]`)
                .should("be.exist")
                .click();

            cy.wait(500);

            cy.getBySel("story-submitButton").should("be.exist").click();

            // 3) then assert that you can see these two stories
            cy.getBySel("story-view").should("be.visible").click();
            cy.wait(100);
            cy.getBySel("story-noStories", { timeout: 0 }).should("be.not.exist");

            cy.getBySel("story-text")
                .should("be.visible")
                .invoke("text")
                .should("eq", stories.first.text);

            // cy.getBySel("story-color")
            //     .should("exist")
            //     .invoke("css", "background-color")
            //     .then((color) => {
            //         cy.log("Extracted Color:", color);
            //         expect(color).to.eq(stories.first.color);
            //     });

            // cy.getBySel("story-color")
            //     .should("exist")
            //     .invoke("style")
            //     .should("eq", `[background-color: ${stories.first.color}]`);

            cy.wait(1000);

            cy.getBySel("story-text")
                .should("be.visible")
                .invoke("text")
                .should("eq", stories.second.text);

            // cy.getBySel("story-color")
            //     .should("exist")
            //     .invoke("status")
            //     .should("eq", `[background-color: ${stories.second.color}]`);

            cy.wait(1000);

            cy.getBySel("story-backHomeButton").should("be.visible").click();

            cy.getBySel("story-view").should("be.visible");
        });
    });
});
