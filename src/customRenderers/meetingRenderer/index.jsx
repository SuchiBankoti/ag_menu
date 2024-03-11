import "./style.css"
export default function MeetingRenderer(params) {
  const meetingTime = getTimeLeftForMeeting(params.value)
  const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255},0.5)`;
  return <span
    className="meeting"
    style={{ background:`${randomColor}`}}
  >{meetingTime}
  </span>
  };


function getTimeLeftForMeeting (nextMeetingDate){
    const now = new Date();
    const meetingDate = new Date(nextMeetingDate);
    
    if (
      meetingDate.getDate() === now.getDate() &&
      meetingDate.getMonth() === now.getMonth() &&
      meetingDate.getFullYear() === now.getFullYear()
    ) {
      const timeDiff = meetingDate.getTime() - now.getTime();
      const minutesLeft = Math.floor(timeDiff / (1000 * 60));
      
      if (minutesLeft <= 0) {
        return 'Meeting is in progress';
      } else {
        return `${minutesLeft} min left for the meeting today`;
      }
    }
    
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    
    if (
      meetingDate.getDate() === tomorrow.getDate() &&
      meetingDate.getMonth() === tomorrow.getMonth() &&
      meetingDate.getFullYear() === tomorrow.getFullYear()
    ) {
      return 'Meeting is tomorrow';
    }
    
    return `Meeting on ${meetingDate.toDateString()}`;
  };
  