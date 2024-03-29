// Type definitions for gtfs 3.1.4
// Project: https://github.com/BlinkTagInc/node-gtfs
// Definitions by: Matt Moran <https://github.com/DarkMatterMatt>

import parse from "csv-parse";
import { Database } from "sqlite";

declare module "gtfs" {
  type SqlValue =
    | undefined
    | null
    | string
    | number
    | boolean
    | Date
    | SqlValue[];

  type SqlWhere = Record<string, null | SqlValue | SqlValue[]>;

  type SqlSelect = string[];

  type SqlOrderBy = [string, "ASC" | "DESC"][];

  export interface Config {
    /**
     * An array of GTFS files to be imported.
     */
    agencies: {
      /**
       * Exclude files - if you don't want all GTFS files to be imported,
       * you can specify an array of files to exclude.
       */
      exclude?: string[];

      /**
       * Specify custom headers for download URL.
       */
      headers?: Record<string, string>;

      /**
       * Specify a path to a zipped GTFS file or an unzipped GTFS directory.
       * One of `url` or `path` must be provided.
       */
      path?: string;

      /**
       * Specify a download URL. One of `url` or `path` must be provided.
       */
      url?: string;
    }[];

    /**
     * Options passed to csv-parse for parsing GTFS CSV files.
     */
    csvOptions?: parse.Options;

    /**
     * Path to a directory to store exported GTFS files. Defaults to `gtfs-export/<agency_name>`.
     */
    exportPath?: string;

    /**
     * A path to an SQLite database. Defaults to using an in-memory database.
     */
    sqlitePath?: string;

    /**
     * Whether or not to print output to the console. Defaults to true.
     */
    verbose?: boolean;
  }

  /**
   * Use exportGtfs() in your code to run an export of a GTFS file specified in a config.json file.
   */
  export function exportGtfs(config: Config): Promise<void>;

  /**
   * Use importGtfs() in your code to run an import of a GTFS file specified in a config.json file.
   */
  export function importGtfs(config: Config): Promise<void>;

  /**
   * Open database before making any queries.
   */
  export function openDb(config: Config): Promise<Database>;

  /**
   * Closes open database.
   */
  export function closeDb(): Promise<void>;

  /**
   * Get open database. Throws error if no database is open.
   */
  export function getDb(): Promise<Database>;

  /**
   * Queries agencies and returns a promise for an array of agencies.
   */
  export function getAgencies(
    query: SqlWhere,
    fields: SqlSelect,
    sortBy: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries attributions and returns a promise for an array of attributions.
   */
  export function getAttributions(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries routes and returns a promise for an array of routes.
   */
  export function getRoutes(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries stops and returns a promise for an array of stops.
   */
  export function getStops(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries stops and returns a promise for an geoJSON object of stops.
   * All valid queries for `getStops()` work for `getStopsAsGeoJSON()`.
   */
  export function getStopsAsGeoJSON(query?: SqlWhere): Record<string, any>[];

  /**
   * Queries `stop_times` and returns a promise for an array of stop_times.
   */
  export function getStoptimes(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries trips and returns a promise for an array of trips.
   */
  export function getTrips(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries shapes and returns a promise for an array of shapes.
   */
  export function getShapes(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries shapes and returns a promise for an geoJSON object of shapes.
   * All valid queries for `getShapes()` work for `getShapesAsGeoJSON()`.
   */
  export function getShapesAsGeoJSON(query?: SqlWhere): Record<string, any>[];

  /**
   * Queries calendars and returns a promise for an array of calendars.
   */
  export function getCalendars(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries calendar_dates and returns a promise for an array of calendar_dates.
   */
  export function getCalendarDates(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries fare_attributes and returns a promise for an array of fare_attributes.
   */
  export function getFareAttributes(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries fare_rules and returns a promise for an array of fare_rules.
   */
  export function getFareRules(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries feed_info and returns a promise for an array of feed_infos.
   */
  export function getFeedInfo(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries frequencies and returns a promise for an array of frequencies.
   */
  export function getFrequencies(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries levels and returns a promise for an array of levels.
   */
  export function getLevels(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries pathways and returns a promise for an array of pathways.
   */
  export function getPathways(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries transfers and returns a promise for an array of transfers.
   */
  export function getTransfers(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries translations and returns a promise for an array of translations.
   */
  export function getTranslations(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries directions and returns a promise for an array of directions.
   * These are from the non-standard `directions.txt` file.
   */
  export function getDirections(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries stop_attributes and returns a promise for an array of stop_attributes.
   * These are from the non-standard `stop_attributes.txt` file.
   */
  export function getStopAttributes(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries timetables and returns a promise for an array of timetables.
   * These are from the non-standard `timetables.txt` file.
   */
  export function getTimetables(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
     * Queries timetable_stop_orders and returns a promise for an array of timetable_stop_orders.
     * These are from the non-standard `timetable_stop_order.txt` file.

    */
  export function getTimetableStopOrders(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
     * Queries timetable_pages and returns a promise for an array of timetable_pages.
     * These are from the non-standard `timetable_pages.txt` file.

    */
  export function getTimetablePages(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries timetable_notes and returns a promise for an array of timetable_notes.
   * These are from the non-standard `timetable_notes.txt` file.
   */
  export function getTimetableNotes(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries timetable_notes_references and returns a promise for an array of timetable_notes references.
   * These are from the non-standard `timetable_notes_references.txt` file.
   */
  export function getTimetableNotesReferences(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries board-alights and returns a promise for an array of board-alights.
   */
  export function getBoardAlights(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries ride-feed-info and returns a promise for an array of ride-feed-info.
   */
  export function getRideFeedInfos(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries rider trips and returns a promise for an array of rider trips.
   */
  export function getRiderTrips(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries riderships and returns a promise for an array of riderships.
   */
  export function getRiderships(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];

  /**
   * Queries trip-capacities and returns a promise for an array of trip-capacities.
   */
  export function getTripCapacities(
    query?: SqlWhere,
    fields?: SqlSelect,
    sortBy?: SqlOrderBy
  ): Record<string, any>[];
}
