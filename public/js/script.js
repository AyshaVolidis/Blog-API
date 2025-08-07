let app = document.getElementById("app");

const createElement = (tag, classes = [], text = "") => {
  let element = document.createElement(tag);
  classes.forEach((clas) => {
    element.classList.add(clas);
  });
  element.textContent = text;
  return element;
};

const appendToParent = (parent, children = []) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

const createDivForm = (name) => {
  let div = createElement("div");
  let label = createElement(
    "label",
    ["block", "mb-1", "text-sm", "font-medium", "text-gray-900"],
    name
  );
  let input;
  if (name == "content") {
    input = createElement("textarea", [
      "bg-gray-50",
      "border",
      "border-gray-300",
      "text-gray-900",
      "rounded-lg",
      "focus:outline-none",
      "focus:ring-purple-600",
      "focus:border-purple-600",
      "block",
      "w-full",
      "p-2.5",
    ]);
  } else {
    input = createElement("input", [
      "bg-gray-50",
      "border",
      "border-gray-300",
      "text-gray-900",
      "rounded-lg",
      "focus:outline-none",
      "focus:ring-purple-600",
      "focus:border-purple-600",
      "block",
      "w-full",
      "p-2.5",
    ]);
  }
  if(name=='Password'){
    input.type = "password";
  }
  else{
    input.type = "text";
  }
  input.name = name;
  input.addEventListener("input", () => {
    let errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.tagName === "P") {
      errorMessage.remove();
    }
  });
  appendToParent(div, [label, input]);
  return div;
};


const createLoginPage=()=>{
  let div=createElement('div',['min-h-screen','flex','items-center','justify-center','bg-purple-600'])
  div.id='LoginModel'
  let signInDiv=createElement('div',['bg-white', 'p-8', 'rounded-2xl', 'shadow-lg', 'w-full', 'max-w-sm'])
  let header=createElement('h2',['text-2xl', 'font-bold', 'text-center', 'text-purple-700', 'mb-3'],'Sign In')
  let form = createElement("form", ["space-y-4", "md:space-y-6"]);
  form.action='/users'
  form.method='post'
  let arrayInputs = ["FirstName", "SecondName", "Password"];
  arrayInputs.forEach((input) => {
    appendToParent(form, [createDivForm(input)]);
  });
  let submitbtn = createElement(
    "button",
    [
      "bg-purple-700",
      "text-white",
      "font-medium",
      "px-4",
      "py-2",
      "rounded-md",
      "hover:bg-purple-800",
    ],
    "Sign In"
  );
  submitbtn.addEventListener('click',(e)=>{
    let isVaild = true;
    e.preventDefault();
    document.querySelectorAll("form [name]").forEach((input) => {
      if (input.value.trim() == "") {
        isVaild = false;
        if (!input.nextElementSibling) {
          let p = createElement(
            "p",
            ["text-red-500"],
            `${input.name} is required`
          );
          appendToParent(input.parentElement, [p]);
        }
      }
    });
    if(isVaild){
      let user={}
      document.querySelectorAll("form [name]").forEach((input) => {
        user[input.name.trim().toLowerCase()] = input.value;
      });
      console.log(user)
      createUser(user)
    }
  })
  appendToParent(form,[submitbtn])
  appendToParent(signInDiv,[header,form])
  appendToParent(div,[signInDiv])
  return div
}
appendToParent(app,[createLoginPage()])

const createHome = (id='') => {
  document.body.className='bg-white min-h-screen py-10 px-4'
  let div = createElement("div");
  let header = createElement(
    "h1",
    ["text-5xl", "font-bold", "text-center", "mb-6", "text-purple-500"],
    "Welcome to your blog"
  );
  let divBtns = createElement("div", [
    "flex",
    "justify-between",
    "max-w-7xl",
    "mx-auto",
    "mb-10",
  ]);
  let divUserId=createElement('div',['px-4','py-2','rounded-md','bg-purple-700','text-white','w-[25%]','ml-6','my-2'],`Your User Id is :${id}`)
  let addBtn = createElement(
    "button",
    [
      "border-2",
      "border-purple-600",
      "text-white",
      "bg-purple-600",
      "font-medium",
      "px-4",
      "py-2",
      "rounded-lg",
      "cursor-pointer",
    ],
    "Add Blog"
  );
  addBtn.addEventListener("click", () => {
    let div = AddBlogModel();
    div.classList.remove("hidden");
    appendToParent(app, [div]);
  });
  let inputSearch = createElement("input", [
    "border-2",
    "border-purple-600",
    "px-4",
    "rounded",
    "mr-2",
    "focus:outline-none",
    "focus:ring-purple-400",
  ]);
  inputSearch.placeholder = "Search by UserId";
  inputSearch.addEventListener("input", () => {
    console.log(inputSearch.value);
    if (inputSearch.value.trim() === "") getPosts();
    else getPostsbyUserId(inputSearch.value.trim());
  });
  appendToParent(divBtns, [addBtn, inputSearch]);
  appendToParent(div, [header,divUserId,divBtns]);
  return div;
};

const AddBlogModel = () => {
  let BigDiv = createElement("div", [
    "fixed",
    "inset-0",
    "flex",
    "items-center",
    "justify-center",
    "z-50",
    "hidden",
  ]);
  BigDiv.id = "AddBlog";
  let layerDiv = createElement("div", [
    "absolute",
    "inset-0",
    "bg-black/75",
    "z-40",
  ]);
  layerDiv.addEventListener("click", () => {
    BigDiv.classList.add("hidden");
  });

  let containearDiv = createElement("div", [
    "relative",
    "z-50",
    "w-full",
    "bg-white",
    "rounded-lg",
    "shadow",
    "sm:max-w-md",
    "xl:p-0",
    "overflow-y-auto",
    "max-h-[90vh]",
  ]);

  let contentDiv = createElement("div", [
    "p-6",
    "space-y-4",
    "md:space-y-6",
    "sm:p-8",
  ]);
  let title = createElement(
    "p",
    [
      "text-xl",
      "font-bold",
      "leading-tight",
      "tracking-tight",
      "text-purple-700",
      "md:text-2xl",
    ],
    "Add your Blog!"
  );

  let form = createElement("form", ["space-y-4", "md:space-y-6"]);
  form.action='/posts'
  form.method='post'
  let arrayInputs = ["userId", "title", "content"];
  arrayInputs.forEach((input) => {
    appendToParent(form, [createDivForm(input)]);
  });

  let btns = createElement("div", ["flex", "items-start", "gap-3"]);
  let submitbtn = createElement(
    "button",
    [
      "bg-purple-700",
      "text-white",
      "font-medium",
      "px-4",
      "py-2",
      "rounded-md",
      "hover:bg-purple-800",
    ],
    "Add Blog"
  );
  let cancelbtn = createElement(
    "button",
    [
      "bg-gray-500",
      "text-white",
      "font-medium",
      "px-4",
      "py-2",
      "rounded-md",
      "hover:bg-gray-700",
    ],
    "Cancel"
  );
  cancelbtn.addEventListener("click", (e) => {
    e.preventDefault();
    BigDiv.classList.add("hidden");
  });

  submitbtn.addEventListener('click',(e)=>{
    let isVaild = true;
    e.preventDefault();
    document.querySelectorAll("form [name]").forEach((input) => {
      if (input.value.trim() == "") {
        isVaild = false;
        if (!input.nextElementSibling) {
          let p = createElement(
            "p",
            ["text-red-500"],
            `${input.name} is required`
          );
          appendToParent(input.parentElement, [p]);
        }
      }
    });
    if(isVaild){
      let post={}
      document.querySelectorAll("form [name]").forEach((input) => {
        post[input.name.trim()] = input.value;
      });
      console.log(post)
      createPost(post)
      BigDiv.classList.add("hidden");
    }
  })

  appendToParent(btns, [submitbtn, cancelbtn]);
  appendToParent(form, [btns]);

  appendToParent(contentDiv, [title, form]);
  appendToParent(containearDiv, [contentDiv]);
  appendToParent(BigDiv, [layerDiv, containearDiv]);
  return BigDiv;
};


let divCards = createElement("div", [
  "max-w-7xl",
  "mx-auto",
  "grid",
  "grid-cols-1",
  "sm:grid-cols-2",
  "lg:grid-cols-3",
  "gap-8",
]);

const createCard = (data) => {
  let div = createElement("div", [
    "relative",
    "border",
    "border-purple-300",
    "shadow-md",
    "shadow-purple-100",
    "rounded-md",
    "p-6",
    "pt-8",
    "bg-white",
  ]);
  let userName = createElement(
    "div",
    [
      "absolute",
      "-top-4",
      "left-1/2",
      "-translate-x-1/2",
      "bg-purple-600",
      "text-white",
      "px-4",
      "py-1",
      "rounded-full",
      "text-sm",
      "font-medium",
      "shadow",
    ],
    data["userName"]
  );
  let titleheader = createElement(
    "h2",
    ["text-xl", "font-semibold", "text-purple-700", "mb-2"],
    data["title"]
  );
  let contentText = createElement(
    "p",
    ["text-gray-700", "leading-relaxed"],
    data["content"]
  );
  appendToParent(div, [userName, titleheader, contentText]);
  return div;
};

const getPosts = () => {
  divCards.innerHTML = "";
  fetch(`/posts`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Posts:", data);
      const cards = data.map(createCard);
      appendToParent(divCards, cards);
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
    });
};

const getPostsbyUserId = (id) => {
  divCards.innerHTML = "";
  fetch(`/posts/user/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Posts:", data);
      const cards = data.map(createCard);
      appendToParent(divCards, cards);
    })
    .catch((err) => {
      console.error("Error fetching posts:", err.message);
      const extractedMessage = err.message.match(/"([^"]+)"/);
      const messageToShow = extractedMessage
        ? extractedMessage[1]
        : err.message;
      let divError = createElement(
        "div",
        [
          "bg-gray-100",
          "text-red-600",
          "text-center",
          "text-2xl",
          "border",
          "border-red-300",
          "rounded-md",
          "p-4",
          "mb-4",
        ],
        messageToShow
      );
      appendToParent(divCards, [divError]);
    });
};

const createPost=(post)=>{
  fetch('/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
  })
  .then(response=>{
    if(!response.ok)throw new TypeError('Can not add this post because no user has this Id')
    response.json()
  })
  .then(()=>{
    getPosts()
    alert('done')
  })
  .catch(err=>{
    alert(err.message)
  })

}

const createUser=(user)=>{
  fetch('/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })
  .then(response=>{
    if(!response.ok)throw new TypeError('Can not add this user')
    return response.json()
  })
  .then((user)=>{
    getPosts()
    document.getElementById('LoginModel').classList.add('hidden')
    appendToParent(app, [createHome(user.id), divCards]);
    alert(`Welcome ${user.firstname+' '+user.secondname}`)
  })
  .catch(err=>{
    alert(err.message)
  })
}

// getPosts();
// appendToParent(app, [createHome(), divCards]);
