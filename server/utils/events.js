function getListenerCount(eventEmitter) {
  return eventEmitter
    .eventNames()
    .map(eventEmitter.listenerCount)
    .reduce((totalCount, count) => totalCount + count, 0);
}

module.exports = {
  getListenerCount,
};
