/**
 * Construct the Foursquare.Venues module.
 * @param {Object} config A valid configuration.
 */
module.exports = function(config) {
  var core = require("./core")(config),
    logger = require('log4js')(config.log4js).getLogger("node-foursquare.Venues");

  /**
   * Retrieve a list of Venue Categories.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getCategories
   * @see https://developer.foursquare.com/docs/venues/categories.html
   */
  function getCategories(params, accessToken, callback) {
    logger.debug("ENTERING: Venues.getCategories");
    core.callApi("/venues/categories", accessToken, "categories", params || {}, callback);
  }

  /**
   * Explore Foursquare Venues.
   * @param {String|Number} lat The latitude of the location around which to explore.
   * @param {String|Number} lng The longitude of the location around which to explore.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name explore
   * @see https://developer.foursquare.com/docs/venues/explore.html
   */
  function explore(lat, lng, params, accessToken, callback) {
    logger.debug("ENTERING: Venues.explore");
    params = params || {};

    if(!lat || !lng) {
      logger.error("Lat and Lng are both required parameters.");
      callback(new Error("Venues.explore: lat and lng are both required."));
      return;
    }
    params.ll = lat + "," + lng;

    core.callApi("/venues/explore", accessToken, ["keywords", "groups", "warning"], params, callback);
  }

  /**
   * Search Foursquare Venues.
   * @param {String|Number} lat The latitude of the location around which to search.
   * @param {String|Number} lng The longitude of the location around which to search.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name search
   * @see https://developer.foursquare.com/docs/venues/search.html
   */
  function search(lat, lng, params, accessToken, callback) {
    logger.debug("ENTERING: Venues.search");
    params = params || {};

    if(!lat || !lng) {
      logger.error("Lat and Lng are both required parameters.");
      callback(new Error("Venues.explore: lat and lng are both required."));
      return;
    }
    params.ll = lat + "," + lng;

    core.callApi("/venues/search", accessToken, "groups", params, callback);
  }

  /**
   * Return Foursquare Venues near location with the most people currently checked in.
   * @param {String|Number} lat The latitude of the location around which to search.
   * @param {String|Number} lng The longitude of the location around which to search.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getTrending
   * @see https://developer.foursquare.com/docs/venues/trending.html
   */
  function getTrending(lat, lng, params, accessToken, callback) {
    logger.debug("ENTERING: Venues.trending");
    params = params || {};

    if(!lat || !lng) {
      logger.error("Lat and Lng are both required parameters.");
      callback(new Error("Venues.explore: lat and lng are both required."));
      return;
    }

    params.ll = lat + "," + lng;
    core.callApi("/venues/trending", accessToken, "venues", params, callback);
  }

  /**
   * Retrieve a Foursquare Venue.
   * @param {String} venueId The id of a Foursquare Venue.
   * @param {String} [accessToken] The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getVenue
   * @see https://developer.foursquare.com/docs/venues/venues.html
   */
  function getVenue(venueId, accessToken, callback) {
    logger.debug("ENTERING: Venues.getVenue");

    if (!venueId) {
      logger.error("getVenue: venueId is required.");
      callback(new Error("Venues.getVenue: venueId is required."));
      return;
    }

    core.callApi("/venues/" + venueId, accessToken, "venue", null, callback);
  }

  /**
   * Retrieve a specific aspect from the Venues endpoint.
   * @param {String} venueId The id of a Foursquare Venue.
   * @param {String} aspect The aspect to retrieve. Refer to Foursquare documentation for details on currently
   * supported aspects.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} [accessToken] The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getVenueAspect
   * @see https://developer.foursquare.com/docs/index_docs.html
   */
  function getVenueAspect(venueId, aspect, params, accessToken, callback) {
    logger.debug("ENTERING: Venues.getVenueAspect");

    if (!venueId) {
      logger.error("getVenueAspect: venueId is required.");
      callback(new Error("Venues.getVenueAspect: venueId is required."));
      return;
    }

    if (!aspect) {
      logger.error("getVenueAspect: aspect is required.");
      callback(new Error("Venues.getVenueAspect: aspect is required."));
      return;
    }

    core.callApi("/venues/" + venueId + '/' + aspect, accessToken, aspect, params || {}, callback);
  }

  /**
   * Retrieve Check-ins for Users who are at a Venue "now".
   * @param {String} venueId The id of a Foursquare Venue.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getHereNow
   * @see https://developer.foursquare.com/docs/venues/herenow.html
   */
  function getHereNow(venueId, params, accessToken, callback) {
    logger.debug("ENTERING: Venues.getHereNow");

    if (!venueId) {
      logger.error("getHereNow: venueId is required.");
      callback(new Error("Venues.getHereNow: venueId is required."));
      return;
    }

    core.callApi("/venues/" + venueId + '/' + "herenow", accessToken, "hereNow", params || {}, callback);
  }

  /**
   * Retrieve Tips for a Foursquare Venue.
   * @param {String} venueId The id of a Foursquare Venue.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getTips
   * @see https://developer.foursquare.com/docs/venues/tips.html
   */
  function getTips(venueId, params, accessToken, callback) {
    logger.debug("ENTERING: Venues.getTips");

    if (!venueId) {
      logger.error("getTips: venueId is required.");
      callback(new Error("Venues.getTips: venueId is required."));
      return;
    }

    getVenueAspect(venueId, "tips", params, accessToken, callback)
  }

  /**
   * Retrieve Photos for a Foursquare Venue.
   * @param {String} venueId The id of a Foursquare Venue.
   * @param {String} [group="checkin"] The type of photos to retrieve. Refer to Foursquare documentation for details
   * on currently supported groups.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getPhotos
   * @see https://developer.foursquare.com/docs/venues/photos.html
   */
  function getPhotos(venueId, group, params, accessToken, callback) {
    logger.debug("ENTERING: Venues.getPhotos");

    if (!venueId) {
      logger.error("getPhotos: venueId is required.");
      callback(new Error("Venues.getPhotos: venueId is required."));
      return;
    }

    params = params || {};
    params.group = group || "checkin";
    getVenueAspect(venueId, "photos", params, accessToken, callback)
  }

  /**
   * Retrieve Links for a Foursquare Venue.
   * @param {String} venueId The id of a Foursquare Venue.
   * @param {Object} [params] An object containing additional parameters. Refer to Foursquare documentation for details
   * on currently supported parameters.
   * @param {String} accessToken The access token provided by Foursquare for the current user.
   * @param {Function} callback The function to call with results, function({Error} error, {Object} results).
   * @name getLinks
   * @see https://developer.foursquare.com/docs/venues/links.html
   */
  function getLinks(venueId, params, accessToken, callback) {
    logger.debug("ENTERING: Venues.getLinks");

    if (!venueId) {
      logger.error("getLinks: venueId is required.");
      callback(new Error("Venues.getLinks: venueId is required."));
      return;
    }

    getVenueAspect(venueId, "links", params, accessToken, callback)
  }

  return {
    "getCategories" : getCategories,
    "explore" : explore,
    "search" : search,
    "getTrending" : getTrending,
    "getVenue" : getVenue,
    "getVenueAspect" : getVenueAspect,
    "getHereNow" : getHereNow,
    "getTips" : getTips,
    "getPhotos" : getPhotos,
    "getLinks" : getLinks
  }
};