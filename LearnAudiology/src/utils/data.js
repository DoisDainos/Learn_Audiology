import store from 'react-native-simple-store';

/*
 * Save graph with provided title and generated local date-time variable.
 */
function saveGraph(title, points) {
  // DAYOFWEEK MONTH [BLANK] DAY TIME YEAR
  var timeComplete = new Date().toLocaleString().split(' ');
  var index = 2;
  if (timeComplete[2] === '') {
    index++;
  }
  var date = timeComplete[0] + ' ' + timeComplete[1] + ' ' +
  timeComplete[index++] + ' ' + timeComplete[++index];
  var time = timeComplete[--index];
  var graph = {
    date: date,
    time: time,
    points: points
  }
  store.push('graphTitles', title);
  store.push(title, graph);
}

/*
 * Retrieve a graph with the given title.
 */
function getGraph(title) {
  store.get(title)
  .then(graph => {
      if (!graph) {
        console.log('No graphs with that title saved!');
      } else {
        console.log(graph);
        return graph;
      }
    }
  )
}

/*
 *  Retrieve all graph titles.
 */
function getGraphTitles() {
  return store.get('graphTitles')
  .then(titles => {
    console.log('data titles: ', titles);
    return titles;
  })
}

/*
 * Delete graph with the given title.
 */
function deleteGraph(title) {
  store.delete(title);
}

module.exports = {
  saveGraph: saveGraph,
  getGraph: getGraph,
  deleteGraph: deleteGraph,
  getGraphTitles: getGraphTitles
}
