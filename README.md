![logo](https://developer.trekksoft.com/img/logo.png)

# Trekksoft Demo Project

## Description

This is a test project - website that searches for GitHub users.

## Usage

### Restrictions

This website gratefully uses GitHub Public API. However, it comes with pitfalls: it has limitations on both frequency and functionality. Thus, for example, it is not possible to know, how many people there are in specific organization. Two main limitations:

1. `Search` results are pageable, and the maximum length of one page is 100 items, so this website works with only first 100 results.
2. It cannot be defined how many workers there are in organization. To keep as many design ideas as possible I replaced this information with "public repos" count for users and organizations.

### Online Version

You could access the website [🔗here🔗](https://trekksoft-demo.herokuapp.com/).

### Prerequisites

You need NodeJs and Yarn / Npm installed to start this project on your machine.

### Launch

To launch locally, you need to clone this repo:
with ssh: `git clone git@github.com:MaximKalinin/trekksoft-demo.git`
or with https: `git clone https://github.com/MaximKalinin/trekksoft-demo.git`.

Then in terminal do the following:

```bash
$ yarn install && yarn start
```

Then go to http://localhost:8080/ on your browser.
You should see page with search👇:
![](https://sun1-23.userapi.com/61clC__tROV1NUpPwx8sDaHs0PaX23kgOFUDIQ/5quqjKmqw3Q.jpg)

## 🏗Working Process

_This paragraph is about the process of creating this website._

Firstly, I have looked through API, found all the restrictions and functionality and made wrong assumption that I will need a backend server. After some detailed research it became clear that server is not necessary and I deleted it, but you still can find it in commit history.

I've set up the project with **React** as a framework, **Typescript** for type definitions, **Prettier** and **ESLint** to ensure the confident code style and **Jest** for testing purposes, set up **CI**, thanks to GitHub and their runners. Then created **Webpack** config file also written on TypeScript language. It became possible thanks to **ts-node**, that can run TS without transpiling.

Then I added **Less** and **CSS Modules**, so that any classname would be file-scoped. I extracted all CSS to a separate file so it does not affect JS enginge of the browser. I also changed all the classnames to random emoji😀 in production.

After that I've tested API, which I made queries with **Axios** in **async / await** manner. I also set up a **caching** for queries, so we can make less requests and not to get bump into limitations.

Next, I continuously created all required components and styles for them so they all are **pixel-perfect**. I then added styles for desktop, so this design solution is **mobile-first**.

Finally, I wrote some **module tests**.

These were all the core steps of this task, **Thank You for reading till the end and have a great day!**
