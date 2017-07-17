/** Class representing a Clock Tower */
export class ClockTower {
  private startHour: number;
  private endHour: number;
  private includesMidnight: boolean;
  private bells: number;

  /**
   * Count bell tolls between two given times
   * @param {string} startTime - The start time in 24-hour notation, must be between 0:00 and 24:59
   * @param {string} endTime - The end time in 24-hour notation, must be between 0:00 and 24:59
   */
  public countBells (startTime: string, endTime: string) {
    this.includesMidnight = false;
    this.bells = 0;

    try {
      this.parseAndValidateTimes(startTime, endTime);

      if (this.includesMidnight) {
        this.addBellsBetween(this.startHour, 24);
        this.addBellsBetween(1, this.endHour);

      } else {
        this.addBellsBetween(this.startHour, this.endHour);
      }

      return this.bells;

    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  /**
   * Parses, validates, and normalizes start and end times
   * @param {string} startTime - The start time in 24-hour notation, must be between 0:00 and 24:59
   * @param {string} endTime - The end time in 24-hour notation, must be between 0:00 and 24:59
   */
  private parseAndValidateTimes(startTime: string, endTime: string) {
    let startMinute: number, endMinute: number;

    [this.startHour, startMinute] = startTime.split(':').map(piece => parseInt(piece));
    [this.startHour, startMinute] = this.validateAndNormalizeTime(this.startHour, startMinute, "invalid start time: " + startTime);

    [this.endHour, endMinute] = endTime.split(':').map(piece => parseInt(piece));
    [this.endHour, endMinute] = this.validateAndNormalizeTime(this.endHour, endMinute, "invalid end time: " + endTime);

    // Makes sure the bell will toll at least once. Assumes 14:10 -> 14:20 is 10 minutes.
    // To treat 14:10 -> 14:20 as 24 hours, remove this block
    if (this.startHour === this.endHour && startMinute < endMinute && startMinute > 0) {
      throw new Error("timespan too short");
    }

    if (startMinute > 0) {
      this.startHour = (this.startHour === 24) ? 1 : this.startHour + 1;
    }

    if (this.startHour > this.endHour) {
      this.includesMidnight = true;
    }
  }

  /**
   * Adds the bells between given hours to this.bells
   * @param {number} begin - Integer representing initial hour, must be less than end
   * @param {number} end - Integer representing final hour, must be greater than begin
   */
  private addBellsBetween (begin: number, end: number) {
    if (begin > 12) {
      begin -= 12;
      end -= 12;

    } else if (end > 12) {
      end -= 12;
      this.bells += this.sumOfSequence(begin, 12);
      this.bells += this.sumOfSequence(1, end);
      return;
    }

    this.bells += this.sumOfSequence(begin, end);
  }

  /**
   * Calculates the sum of all integers in a sequence
   * @param {number} begin - first integer in sequence
   * @param {number} end - last integer in sequence
   * @return {number} - The sum
   */
  private sumOfSequence (begin: number, end: number) {
    return (end - begin + 1) * (end + begin) / 2;
  }

  /**
   * Validates that a given hour and minute represent a real time of day, and normalizes the hour. Params hour
   * and minute accept any type so that a custom error message can be used. The hour is normalized such that
   * 0 or 24 will be returned as 24
   * @param {any} hour - the hour, valid if a number and 0 <= hour <= 24
   * @param {any} minute - the minute, valid if a number and 0 <= minute <= 59
   * @param {string} message - if invalid, message to include with error, defaults
   * to 'invalid time' if not provided
   * @returns {Array<number>} - An array containing the normalized hour and minute
   */
  private validateAndNormalizeTime (hour: any, minute: any, errorMessage: string = 'invalid time') {
    if (typeof hour === "number" && 0 <= hour && hour <= 24) {
      if (hour === 0) {
        hour = 24;
      }

    } else {
      throw new Error(errorMessage);
    }

    if (typeof minute === "number" && 0 <= minute && minute <= 59) {

    } else {
      throw new Error(errorMessage);
    }

    return [hour, minute];
  }
}
