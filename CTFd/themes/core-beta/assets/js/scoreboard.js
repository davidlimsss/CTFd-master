import Alpine from "alpinejs";
import CTFd from "./index";
import { getOption } from "./utils/graphs/echarts/scoreboard";
import { embed } from "./utils/graphs/echarts";


window.Alpine = Alpine;
window.CTFd = CTFd;

Alpine.data("ScoreboardDetail", () => ({
  data: null,

  async init() {
    this.data = await CTFd.pages.scoreboard.getScoreboardDetail(10);

    let option = getOption(CTFd.config.userMode, this.data);
    embed(this.$refs.scoregraph, option);
  },
}));

Alpine.start();

$(document).ready(function(){
  $("#filter").keyup(function(){

      // Retrieve the input field text and reset the count to zero
      var filter = $(this).val(), count = 0;
// get the list to be searched				
var items = $(".onlineText td");
//get the total lenght for counting later
var totalItems = items.length;
              
      // Loop through the comment list
      $(".onlineText td").each(function(){

          // If the list item does not contain the text phrase fade it out
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
              $(this).fadeOut();

          // Show the list item if the phrase matches and increase the count by 1
          } else {
              $(this).show();
              count++;
          }
      });

      // Update the count
      var numberItems = count;
      //begin if to change colors for input group
if(count == totalItems){
 //If the count matches the total items in the list.  Set the text to 0 and remove Danger and Success Classes
 $("#filter-count").parent().removeClass('btn-success').removeClass('btn-danger');
 $("#filter-count").text(0);
}else if(count == 0){
 //If the count matches 0 in the list.  Set the text to 0 and Add Danger and Remove Success Class
 $("#filter-count").parent().removeClass('btn-success').addClass('btn-danger');
 $("#filter-count").text(0);
}else{
 //If the count is in between 0 and Total items in the list.  Set the text to the counter and Add Success and Remove Danger Class
 $("#filter-count").parent().addClass('btn-success').removeClass('btn-danger');
 $("#filter-count").text(count);
}
  });
});



