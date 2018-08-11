import store from 'react-native-simple-store';

/*
 * Save graph with provided title and generated local date-time variable.
 */
function saveGraph(title, points, overwrite) {
  return getGraph(title)
  .then(title => {
    if (title && !overwrite) {
      console.log('Graph of that name already saved');
      return 'found';
    }
    if (title) {
      return deleteGraph(title)
      .then(() => {
        return pushGraph(title, points)
      })
      .then(() => {
        return 'overwritten';
      })
    }
    console.log('try to save');
    return pushGraph(title, points)
    .then(() => {
      return 'new';
    })
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
  store.push('graphTitles', title);
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
      return graph;
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
