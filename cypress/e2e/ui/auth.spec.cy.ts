import userData from "../../fixtures/users.json";

describe("User Authentication", function () {
    beforeEach(function () {
        cy.visit("/");
        const user = {
            email: userData.email.valid,
            password: userData.password.valid,
            repeatPassword: userData.password.valid,
            phone: userData.phone.valid,
            username: userData.username.valid,
            name: userData.name.valid.english,
        };
        cy.wrap(user).as("user");
    });

    context("Sign Up Scenarios", function () {
        beforeEach(function () {
            cy.visit("/signup");
        });

        context("Valid scenarios", function () {
            it("Validate sign up with English Name", function () {
                const user = this.user;
                console.log("this.user", this.user.email);
                cy.signup(user);

                cy.errorAssertions([]);
            });

            it("Validate sign up with Arabic Name", function () {
                const user = { ...this.user, name: userData.name.valid.arabic };
                cy.signup(user);

                cy.errorAssertions([]);
            });

            it("Validate sign up with Short Valid English Name", function () {
                const user = { ...this.user, name: userData.name.valid.short.english };
                cy.signup(user);

                cy.errorAssertions([]);
            });

            it("Validate sign up with Short Valid Arabic Name", function () {
                const user = { ...this.user, name: userData.name.valid.short.arabic };
                cy.signup(user);

                cy.wait(1000);

                cy.errorAssertions([]);
            });
        });
        context("Invalid scenarios", function () {
            context("Empty fields scenarios", function () {
                it("should show error 'Name is required'", function () {
                    const user = { ...this.user, name: "" };
                    cy.signup(user);
                    cy.errorAssertions(["name"]);
                });
                it("should show error 'Email is required'", function () {
                    const user = { ...this.user, email: "" };
                    cy.signup(user);
                    cy.errorAssertions(["email"]);
                });
                it("should show error 'Phone number is required'", function () {
                    const user = { ...this.user, phone: "" };
                    cy.signup(user);
                    cy.errorAssertions(["phone"]);
                });
                it("should show error 'Password is required'", function () {
                    const user = { ...this.user, password: "" };
                    cy.signup(user);
                    cy.errorAssertions(["password"]);
                });
                it("should show error 'Repeat-Password is required'", function () {
                    const user = { ...this.user, repeatPassword: "" };
                    cy.signup(user);
                    cy.errorAssertions(["repeatPassword"]);
                });
            });

            context("Invalid name input scenarios", function () {
                // it("should show error for typing number in name field", function () {
                //     const user = { ...this.user, name: userInfo.invalidNames.withNumber };
                //     cy.signup(user);
                //     // cy.wait("@signup").its("response.statusCode").should("eq", 201);
                //     cy.location("pathname").should("equal", "/signup");
                // });
                it("should show error for typing special character in name field", function () {
                    const user = {
                        ...this.user,
                        name: userData.name.invalid.withSpecialChar,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["name"]);
                });
            });

            context("Invalid password scenarios", function () {
                it("should show error for password != repeatPassword", function () {
                    const user = {
                        ...this.user,
                        password: userData.password.invalid.mismatch,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["password"]);
                });
                it("should show error 'Password must be at least 8 characters'", function () {
                    const user = {
                        ...this.user,
                        password: userData.password.invalid.lessThan8,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["password"]);
                });
                it("should show error 'Password must have capital letters'", function () {
                    const user = {
                        ...this.user,
                        password: userData.password.invalid.missCapitalLetter,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["password"]);
                });
                it("should show error 'Password must have small letters'", function () {
                    const user = {
                        ...this.user,
                        password: userData.password.invalid.missSmallLetter,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["password"]);
                });
                it("should show error 'Password must have numbers'", function () {
                    const user = {
                        ...this.user,
                        password: userData.password.invalid.missNumber,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["password"]);
                });
                it("should show error 'Password must have special characters'", function () {
                    const user = {
                        ...this.user,
                        password: userData.password.invalid.missSpecialChar,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["password"]);
                });
            });

            // context("Invalid phone input scenarios", function () {
            //     it("should ignore spaces in phone number with spaces", function () {
            //         const user = { ...this.user, phone: userData.phone.invalid.containsSpace };
            //         cy.signup(user);
            //         cy.errorAssertions([]);
            //     });
            //     it("should ignore letters in phone number", function () {
            //         const user = { ...this.user, phone: userData.phone.invalid.containsLetter };
            //         cy.signup(user);
            //         cy.errorAssertions([]);
            //     });
            //     it("should ignore special characters in phone number", function () {
            //         const user = {
            //             ...this.user,
            //             phone: userData.phone.invalid.containsSpecialChar,
            //         };
            //         cy.signup(user);
            //         cy.errorAssertions([]);
            //     });
            //     it("should return error 'Long number'", function () {
            //         const user = {
            //             ...this.user,
            //             phone: userData.phone.invalid.long,
            //         };
            //         cy.signup(user);
            //         cy.errorAssertions(["phone"]);
            //     });
            //     it("should return error 'Short number'", function () {
            //         const user = {
            //             ...this.user,
            //             phone: userData.phone.invalid.short,
            //         };
            //         cy.signup(user);
            //         cy.errorAssertions(["phone"]);
            //     });
            //     it("should return error 'Phone already exists'", function () {
            //         const user = {
            //             ...this.user,
            //             phone: userData.phone.duplicated,
            //         };
            //         cy.signup(user);
            //         cy.errorAssertions(["phone"]);
            //     });
            // });

            context("Wrong Format email scenarios", function () {
                it("should prevent signup with incorrect email 'without @'", function () {
                    const user = {
                        ...this.user,
                        email: userData.email.invalid["without@"],
                    };
                    cy.signup(user);

                    // cy.wait("@signup").its("response.statusCode").should("eq", 200);
                    cy.errorAssertions(["email"]);
                });
                it("should prevent signup with incorrect email 'without .com'", function () {
                    const user = {
                        ...this.user,
                        email: userData.email.invalid["without."],
                    };
                    cy.signup(user);
                    cy.errorAssertions(["email"]);
                });
                // * It's preferable to show suggestion message which is "do you mean validEmail@gmail.com"
                it("should prevent signup with incorrect email 'with gamil'", function () {
                    const user = {
                        ...this.user,
                        email: userData.email.invalid.withGamil,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["email"]);
                });

                it("should prevent signup with incorrect email 'email already exists'", function () {
                    const user = {
                        ...this.user,
                        email: userData.email.duplicated,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["email"]);
                });
            });

            context("Invalid username scenarios", function () {
                it("should show error 'username must has small letter only'", function () {
                    const user = {
                        ...this.user,
                        username: userData.username.invalid.containsCapitalLetter,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["username"]);
                });
                it("should show error 'username must has small letter only'", function () {
                    const user = {
                        ...this.user,
                        username: userData.username.invalid.containsSpace,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["username"]);
                });
                it("should show error 'username must has small letter only'", function () {
                    const user = {
                        ...this.user,
                        username: userData.username.invalid.startsWithNumber,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["username"]);
                });
                it("should show error 'username must has small letter only'", function () {
                    const user = {
                        ...this.user,
                        username: userData.username.invalid.startsWithSpecialChar,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["username"]);
                });
                it("should show error 'username already exists'", function () {
                    const user = {
                        ...this.user,
                        username: userData.username.duplicated,
                    };
                    cy.signup(user);
                    cy.errorAssertions(["username"]);
                });
            });
        });

        context("Redirection scenarios", function () {
            it("should redirect to Google page for sign up", function () {
                // cy.intercept("GET", "https://accounts.google.com/**").as("googleSignupRedirect");
                cy.getBySel("google-button").click();
                // cy.wait(1000);
                // cy.location("pathname").should("eq", "/o/oauth2/v2/auth");
                // // cy.wait("@googleSignupRedirect").its("response.statusCode").should("eq", 200);
                // cy.loginByGoogle("youssefbahy2022@gmail.com", "OsBa!19496");
                cy.loginByGoogleUI("youssefbahy2022@gmail.com", "OsBa!19496");
                cy.AssertSuccessfulOAuth("youssefbahy2022@gmail.com");
            });

            it("should redirect to GitHub page for sign up", function () {
                cy.getBySel("github-button").click();
                cy.loginByGitHub("youssefbahy2022@gmail.com", "OsBa!19496");
                cy.wait(500);
                cy.location("pathname").should("equal", "/");
                // cy.loginByGoogleUI("youssefbahy2022@gmail.com", "OsBa!19496");
                // cy.AssertSuccessfulOAuth("youssefbahy2022@gmail.com");
            });
        });
    });

    // context("Log In Scenarios", function () {
    //     beforeEach(function () {
    //         cy.visit("/login");
    //     });
    //     context("Valid scenarios", function () {
    //         it("should allow valid login with correct credentials", function () {
    //             const user = this.user;
    //             cy.login(user.email, user.password);
    //             cy.wait(1000);
    //             cy.location("pathname").should("equal", "/");
    //         });
    //     });

    //     context("Invalid scenarios", function () {
    //         context("Incorrect credentials scenarios", function () {
    //             it("should prevent login with incorrect credentials, incorrect password", function () {
    //                 const user = { ...this.user, password: userData.password.invalid.mismatch };
    //                 cy.login(user.email, user.password);
    //                 cy.wait(500);
    //                 cy.loginErrorAssertions(["login-email-error"]);
    //             });
    //         });
    //         context("Wrong Format email", function () {
    //             it("should prevent login with incorrect email 'without @'", function () {
    //                 const user = {
    //                     ...this.user,
    //                     email: userData.email.invalid["without@"],
    //                 };
    //                 console.log("password", user.password);
    //                 cy.login(user.email, user.password);
    //                 cy.wait(500);
    //                 cy.loginErrorAssertions(["login-email-error"]);
    //             });
    //             it("should prevent login with incorrect email 'without .com'", function () {
    //                 const user = {
    //                     ...this.user,
    //                     email: userData.email.invalid["without."],
    //                 };
    //                 cy.login(user.email, user.password);
    //                 cy.wait(500);
    //                 cy.loginErrorAssertions(["login-email-error"]);
    //             });
    //             // * It's preferable to show suggestion message which is "do you mean validEmail@gmail.com"
    //             it("should prevent login with incorrect email 'with gamil'", function () {
    //                 const user = {
    //                     ...this.user,
    //                     email: userData.email.invalid.withGamil,
    //                 };
    //                 cy.login(user.email, user.password);
    //                 cy.wait(500);
    //                 cy.loginErrorAssertions(["login-email-error"]);
    //             });
    //         });
    //         context("Empty fields scenarios", function () {
    //             it("should show error 'Invalid email'", function () {
    //                 const user = { ...this.user, email: "" };
    //                 cy.login(user.email, user.password);
    //                 cy.wait(500);
    //                 cy.loginErrorAssertions(["login-email-error"]);
    //             });
    //             it("should show error 'String must contain at least 8 character(s)'", function () {
    //                 const user = { ...this.user, password: "" };
    //                 cy.login(user.email, user.password);
    //                 cy.wait(500);
    //                 cy.loginErrorAssertions(["login-password-error"]);
    //             });
    //         });
    //     });
    //     context("Redirection scenarios", function () {
    //         // it("should redirect to Google page for log in", function () {
    //         //     cy.intercept("GET", "https://accounts.google.com/**").as("googleLoginRedirect");
    //         //     cy.getBySel("google-button").click();
    //         //     // cy.wait("@googleLoginRedirect").its("response.statusCode").should("eq", 200);
    //         // });
    //         it("should redirect to GitHub page for log in", function () {
    //             cy.intercept("GET", "https://github.com/**").as("githubLoginRedirect");
    //             cy.getBySel("github-button").click();
    //             // cy.wait("@githubLoginRedirect").its("response.statusCode").should("eq", 200);
    //         });
    //         it("should redirect to Sign Up page for sign up", function () {
    //             // cy.intercept("GET", "https://github.com/**").as("githubLoginRedirect");
    //             cy.getBySel("signup-button").click();
    //             // cy.wait("@githubLoginRedirect").its("response.statusCode").should("eq", 200);
    //         });
    //         it("should redirect to Forgot Password page for log in", function () {
    //             // cy.intercept("GET", "https://github.com/**").as("githubLoginRedirect");
    //             cy.getBySel("forgot-password-button").click();
    //             // cy.wait("@githubLoginRedirect").its("response.statusCode").should("eq", 200);
    //         });
    //     });
    // });
});
