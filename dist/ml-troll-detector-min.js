$(document).ready(function(){$("#loading").hide()});var typingTimer,MAX_CHARACTERS=240,$input=$(".troll-detector .text");function isEnteredKey(e){return 9==e||13==e||32==e||e>=48&&e<=90||e>=96&&e<=111||e>=186&&e<=192||e>=219&&e<=222}function check_characters(e){$(".character-limit").html($input.text().length+"/240"),isEnteredKey(e.which)&&$input.text().length>=MAX_CHARACTERS&&e.preventDefault(),0==$input.text().length&&($(".is-troll").html("Please enter your text below"),$("#troll-pie").addClass("hidden"),$("#loading").fadeOut())}function onKeyDown(e){check_characters(e),isEnteredKey(e.which)&&(clearTimeout(typingTimer),$("#loading").fadeIn(),$input.children("span").css("background-color","#ffffff00"),typingTimer=setTimeout(function(){analyzeTweet(e)},1e3))}$input.on("keydown",onKeyDown);var colorSwatch=["#3A539B","#647AB3","#8FA2CC","#B9C9E5","#E4F1FE","#F1A9A0","#F08B85","#F06E6A","#F0514F","#F03434"];function drawPie(e){var t=[{value:1-Math.abs(e),color:"#e8e8e8"},{value:Math.abs(e),color:colorSwatch[Math.floor(5*(e+1))]}],o=d3.pie().value(function(e){return e.value}).sort(null),n=d3.arc().outerRadius(10).innerRadius(10/1.5);d3.select("#troll-pie").selectAll("*").remove(),d3.select("#troll-pie").append("svg").attr("width",20).attr("height",20).append("g").attr("transform","translate(10,10)").selectAll("path").data(o(t)).enter().append("path").attr("fill",function(e,t){return e.data.color}).attr("stroke","white").attr("d",n),$("#troll-pie").removeClass("hidden")}function addHighlighting(e,t){for(var o=e.split(/([^A-Z0-9])/gi),n=Object.keys(t),a="",r=0;r<o.length;r++)-1!=n.indexOf(o[r])?a+="<span data-proba = '"+t[o[r]]+"' class = 'hover' style = 'background-color:"+(Math.abs(t[o[r]])<.2?"#ffffff":colorSwatch[Math.floor(5*(t[o[r]]+1))])+"50'>"+o[r]+"</span>":a+=o[r];return a}function getTokenDescriptor(e){return e>0?"More troll-like than organic":e<0?"More organic than troll-like":"No effect"}function analyzeTweet(e){$(".hover-box").remove(),$("#troll-pie").addClass("hidden"),tweet_text=$input.text(),tweet_text.length>0&&$.get("https://ru.dpccdn.net/analyze/"+encodeURIComponent(tweet_text.replace(/\//g,"")),function(t){if(0!=t.master&&drawPie(t.master),t.master>0?$(".is-troll").html("More troll-like than organic"):0==t.master?$(".is-troll").html("Not enough information"):$(".is-troll").html("More organic than troll-like"),$input.text()==tweet_text?$(".text").html(addHighlighting(tweet_text,t.tokenized)):onKeyDown(e),el=document.getElementById("text"),el.focus(),void 0!==window.getSelection&&void 0!==document.createRange){var o=document.createRange();o.selectNodeContents(el),o.collapse(!1);var n=window.getSelection();n.removeAllRanges(),n.addRange(o)}else if(void 0!==document.body.createTextRange){var a=document.body.createTextRange();a.moveToElementText(el),a.collapse(!1),a.select()}$("#loading").fadeOut()})}$(document).on("mouseover",".hover",function(e){var t=(100*parseFloat($(this).data("proba"))).toFixed(2)+"%";0==$(this).has(".hover-box").length&&$(this).append("<div class = 'hover-box'><strong>"+getTokenDescriptor(parseFloat($(this).data("proba")))+"</strong> ("+t+")</div>")}),$(document).on("mouseleave",".hover",function(e){$(this).children(".hover-box").remove()});