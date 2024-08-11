import moment from "moment";

class Utils {
  static showElement(element) {
    element.style.display = "flex";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static emptyElement(element) {
    element.innerHTML = "";
  }

  static formattedDate(dateString) {
    const date = moment(dateString);
    return moment([
      date.year(),
      date.month(),
      date.date(),
      date.hour(),
      date.minute(),
      date.second(),
    ])
      .fromNow()
      .toUpperCase();

    // const date = new Date(dateString);
    // const options = {
    //   month: "short",
    //   day: "2-digit",
    //   year: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true,
    // };
    // return date.toLocaleString("en-US", options).toUpperCase();
  }
}

export default Utils;
