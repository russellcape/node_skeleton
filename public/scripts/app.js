$(() => {
  console.log("loading app.js");

  $("body").on("click", "save-btn", event => {
    event.preventDefault();
    console.log("THIS IS WOKING PROPERLY");
  });
});
