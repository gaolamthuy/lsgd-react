import React from "react";
import moment from "moment";
import { Card, Col, Badge } from "react-bootstrap";

const TransactionCard = ({ post }) => {
  return (
    <>
      {post.map((data, k) => {
        if (data.CD === "+") {
          //handle PCTime
          function zeroPad(num) {
            return num.toString().padStart(6, "0");
          }
          var validDate = moment(data.TransactionDate, "DD/MM/YYYY").format(
            "DD/MM/YYYY"
          );
          var validTime = moment(zeroPad(data.PCTime), "HH:mm:ss").format(
            "HH:mm:ss"
          );
          var validFullDateTime = moment(
            validDate + " " + validTime,
            "DD/MM/YYYY HH:mm:ss"
          );

          var validFullDateTimeString = validFullDateTime.format(
            "🗓️ddd, DD/MM/YYYY ⏰HH:mm:ss"
          );
          var momentFromNow = validFullDateTime.fromNow();
          console.log(typeof momentFromNow);

          const typeOfMomentFromNow = (moment) => {
            if (moment.includes("a few seconds ago") === true) {
              return "primary";
            } else if (moment.includes("seconds ago") === true) {
              return "primary";
            } else if (moment.includes("1 minute ago") === true) {
              return "primary";
            } else if (moment.includes("minutes ago") === true) {
              return "primary";
            } else if (moment.includes("an hour ago") === true) {
              return "primary";
            } else if (moment.includes("hours ago") === true) {
              return "primary";
            } else if (moment.includes("a day ago") === true) {
              return "secondary";
            } else if (moment.includes("days ago") === true) {
              return "secondary";
            } else if (moment.includes("a month ago") === true) {
              return "secondary";
            } else if (moment.includes("months ago") === true) {
              return "secondary";
            }
          };

          //translate minutes ago...
          const momentFromNowTranslate = (moment) => {
            if (moment.includes("a few seconds ago") === true) {
              return "vài giây trước";
            } else if (moment.includes("seconds ago") === true) {
              return moment.replace("seconds ago", "giây trước");
            } else if (moment.includes("1 minute ago") === true) {
              return "1 phút trước";
            } else if (moment.includes("minutes ago") === true) {
              return moment.replace("minutes ago", "phút trước");
            } else if (moment.includes("an hour ago") === true) {
              return "1 giờ trước";
            } else if (moment.includes("hours ago") === true) {
              return moment.replace("hours ago", "giờ trước");
            } else if (moment.includes("a day ago") === true) {
              return "1 ngày trước";
            } else if (moment.includes("days ago") === true) {
              return moment.replace("days ago", "ngày trước");
            } else if (moment.includes("a month ago") === true) {
              return moment.replace("a month ago", "1 tháng trước");
            } else if (moment.includes("months ago") === true) {
              return moment.replace("months ago", "tháng trước");
            }
          };

          //translate date
          const translateValidFullDate = (weekday) => {
            if (weekday.includes("Mon")) {
              return weekday.replace("Mon", "Thứ Hai");
            } else if (weekday.includes("Tue")) {
              return weekday.replace("Tue", "Thứ Ba");
            } else if (weekday.includes("Wed")) {
              return weekday.replace("Wed", "Thứ Tư");
            } else if (weekday.includes("Thu")) {
              return weekday.replace("Thu", "Thứ Năm");
            } else if (weekday.includes("Fri")) {
              return weekday.replace("Fri", "Thứ Sáu");
            } else if (weekday.includes("Sat")) {
              return weekday.replace("Sat", "Thứ Bảy");
            } else if (weekday.includes("Sun")) {
              return weekday.replace("Sun", "Chủ Nhật");
            }
          };

          //print if it's a new transaction
          const checkNewTransaction = (transdate) => {
            if (
              moment().isBefore(moment(transdate).add(+20, "minutes")) === true
            ) {
              return (
                <Card.Header style={{ fontSize: "2rem" }}>
                  <Badge bg="warning">Mới</Badge>
                </Card.Header>
              );
            }
          };

          //print cards
          return (
            <Col key={k} className="py-2" xs={12} md={6} lg={4}>
              <Card border="success">
                {checkNewTransaction(validFullDateTime)}
                <Card.Body>
                  <Badge bg="success" className="mb-1">
                    <Card.Text style={{ fontSize: "1.8rem" }}>
                      Nhận {data.Amount}đ
                    </Card.Text>
                  </Badge>
                  <h4>
                    <Card.Text>
                      <Badge bg={typeOfMomentFromNow(momentFromNow)}>
                        {momentFromNowTranslate(momentFromNow)}
                      </Badge>
                    </Card.Text>
                  </h4>
                  <Card.Text>
                    {translateValidFullDate(validFullDateTimeString)}
                  </Card.Text>

                  <Card.Text>{data.Description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        }
      })}
    </>
  );
};

export default TransactionCard;
