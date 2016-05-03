/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object and ensures
         * that it has a URL defined and that it's not empty.
         */
        it('URL is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed in the allFeeds object and ensures
         * that its name is defined and that it's not empty.
         */
        it('Name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {

        // Check that the menu element is hidden by default
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Check that the menu changes visibility when the menu icon is clicked
        it("visibility is toggled when the menu icon is clicked", function() {
            var menuIcon = $('.menu-icon-link');

            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        // Load the 'loadFeed' function first
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Once the 'loadFeed' function has finished check that there is at
         * least a single entry in the container.
         */
        it('there should be at least a single entry when feed is loaded', function(done) {
            var container = $('.feed');

            expect(container.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var contentDefault,
            contentNew,
            feed = $('.feed');

        beforeEach(function(done) {

            // Save default content in feed
            contentDefault = feed.html();

            // Load the feed with different content
            loadFeed(1, function() {
                contentNew = feed.html();
                done();
            });
        });

        // Ensure that the new content is different from the old content
        it('the content changes when a new feed is loaded', function(done) {
            expect(contentNew).not.toBe(contentDefault);
            done();
        });
    });
}());
