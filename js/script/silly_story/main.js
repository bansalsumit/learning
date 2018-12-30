var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');
var storyText = 'It was 94 fahrenheit outside , so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
var insertX = 'Willy the Goblin\nBig Daddy\nFather Christmas';
var insertY = 'the soup kitchen\nDisneyland\nthe White House';
var insertZ = 'spontaneously combusted\nmelted into a puddle on the sidewalk\nturned into a slug and crawled away';

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}

randomize.addEventListener('click', result);

function result() {
  var newStory = storyText;
  xItem = randomValueFromArray(insertX);
  yItem = randomValueFromArray(insertY);
  zItem = randomValueFromArray(insertZ);
  newStory = newStory.replace(':insertx', xItem);
  newStory = newStory.replace(':insertx', xItem);
  newStory = newStory.replace(':inserty', yItem);
  newStory = newStory.replace(':insertz', zItem);
  if(customName.value !== '') {
    var name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  if(document.getElementById("uk").checked) {
    var weight = Math.round(300* 0.071429) + ' stone';
    var temperature =  Math.round((94-32)*.5556) + ' centigrade';
    newStory = newStory.replace('94 fahrenheit', temperature);
    newStory = newStory.replace('300 pounds', weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
