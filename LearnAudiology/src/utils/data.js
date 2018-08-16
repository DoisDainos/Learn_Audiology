import store from 'react-native-simple-store';

/*
 * Save graph with provided title and generated local date-time variable.
 */
function saveGraph(title, points, overwrite) {
  return getGraph(title)
  .then(graph => {
    if (graph && !overwrite) {
      console.log('Request overwrite');
      return false;
    } else if (graph) {
      console.log('Overwriting');
      deleteGraph(title);
      pushGraph(title, points);
    } else {
      console.log('New graph saved')
      pushGraph(title, points);
    }
    return true;
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
      // Find if title already in use
      let found = false;
      for (let i=0; i<titles.length; i++) {
        if (titles[i] === title) {
          found = true;
          break;
        }
      }
      if (!found) {
        console.log('New graph title added');
        store.push('graphTitles', title);
      }
    } else {
      // No titles yet
      console.log('First graph title added');
      store.push('graphTitles', title);
    }
  })
  .then(() => {
    store.push(title, graph);
  })
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
  console.log('Attempting to delete graph with title:', title);
  return store.get(title)
  .then(found => {
    if (found) {
      console.log('Deleting graph with title', title)
      return store.delete(title)
      .then(() => {
        console.log('Deleted graph');
        return true;
      })
    } else {
      console.log('Unable to delete graph, could not find.')
      return false;
    }
  })
}

function clearTitles() {
  return store.delete('graphTitles');
}

function deleteTitle(title) {
  console.log('Preparing to delete title:', title);
  return store.get('graphTitles')
  .then(titles => {
    console.log('titles to check', titles);
    if (titles) {
      return store.delete('graphTitles')
      .then(() => {
        console.log('Searching', titles);
        for (let i=0; i<titles.length; i++) {
          console.log('Comparing', titles[i], title);
          if (titles[i] !== title) {
            return store.push('graphTitles', titles[i])
          }
        }
        return true;
      })
      return true;
    } else {
      console.log('No graph found when attempting to delete')
      return false;
    }
  })
}

module.exports = {
  saveGraph: saveGraph,
  getGraph: getGraph,
  deleteGraph: deleteGraph,
  getGraphTitles: getGraphTitles,
  clearTitles: clearTitles,
  deleteTitle: deleteTitle
}
