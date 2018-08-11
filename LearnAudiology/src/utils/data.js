import store from 'react-native-simple-store';

/*
 * Save graph with provided title and generated local date-time variable.
 */
function saveGraph(title, points, overwrite) {
  getGraph(title)
  .then(graph => {
    if (graph && !overwrite) {
      console.log('Graph of that name already saved');
    } else if (graph) {
      deleteGraph(title);
      pushGraph(title, points);
    } else {
      pushGraph(title, points)
    }
  })
}

function pushGraph(title, points) {
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
  store.get('graphTitles')
  .then(titles => {
    if (titles) {
      for (let i=0; i<titles.length; i++) {
        if (titles[i] != title) {
          store.push('graphTitles', title);
        }
      }
    } else {
      store.push('graphTitles', title);
    }
  })
  store.push(title, graph);
}

/*
 * Retrieve a graph with the given title.
 */
function getGraph(title) {
  return store.get(title)
  .then(graph => {
    if (!graph) {
      console.log('No graphs with that title saved!');
    } else {
      console.log('Graph found ', title);
      return graph;
    }
  });
}

/*
 *  Retrieve all graph titles.
 */
function getGraphTitles() {
  return store.get('graphTitles')
  .then(titles => {
    if (titles) {
      console.log('Titles:', titles);
      return titles;
    }
    console.log('No titles found');
  })
}

/*
 * Delete graph with the given title.
 */
function deleteGraph(title) {
  store.delete(title);
}

function clearTitles() {
  store.delete('graphTitles');
}

module.exports = {
  saveGraph: saveGraph,
  getGraph: getGraph,
  deleteGraph: deleteGraph,
  getGraphTitles: getGraphTitles,
  clearTitles: clearTitles
}
