export default ({ app }, inject) => {
  inject('timeElapsedFromGivenDate', (givenDate) => {
    // Parse the given date string to obtain a Date object
    const givenDateTime = new Date(givenDate);
    const currentTime = new Date();
    
    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(currentTime - givenDateTime);
    
    // Calculate the elapsed time
    const elapsedYears = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    const elapsedMonths = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const elapsedDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const elapsedHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const elapsedMinutes = Math.floor(timeDifference / (1000 * 60));
    const elapsedSeconds = Math.floor(timeDifference / 1000);
    
    // Return the elapsed time as an object
    let outputDate=''
    if(elapsedYears>0){
      outputDate=`${elapsedYears} years ago`
    }
    if(elapsedMonths>0){
      outputDate=`${elapsedMonths} months ago`
      return outputDate
    }
    if(elapsedDays>0){
      outputDate=`${elapsedDays} days ago`
      return outputDate
    }
    if(elapsedHours>0){
      outputDate=`${elapsedHours} hours ago`
      return outputDate
    }
    if(elapsedMinutes>0){
      outputDate=`${elapsedMinutes} minutes ago`
      return outputDate
    }
    if(elapsedSeconds>0){
      outputDate=`${elapsedSeconds} seconds ago`
      return outputDate
    }
    
  });
};