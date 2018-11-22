const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

const getFormattedDate1 = (data) => {
    let date;
    if(isNaN(data)) {
        date = new Date(data.replace(/-/g, "/"));
    } else {
        date = new Date(data);
    }
    let dayText = days[date.getDay() + 1];
    let dayNumber = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return `${dayText}, ${month}/${dayNumber}/${year}`;
}

const getFormattedDate2 = (data) => {
    let date;
    if(isNaN(data)) {
        date = new Date(data.replace(/-/g, "/"));
    } else {
        date = new Date(data);
    }
    let dayNumber = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hours = date.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    return `${month}/${dayNumber}/${year} ${ampm}`;
}

const getFormattedDate3 = (data) => {
    let date;
    if(isNaN(data)) {
        date = new Date(data.replace(/-/g, "/"));
    } else {
        date = new Date(data);
    }
    let dayNumber = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes() < 9 ? "0" + date.getMinutes() : date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    return `${month}/${dayNumber}/${year} ${hours}:${minutes} ${ampm}`;
}

const getFormattedDate4 = (data) => {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let date;
    if(isNaN(data)) {
        date = new Date(data.replace(/-/g, "/"));
    } else {
        date = new Date(data);
    }
    let dayText = days[date.getDay()];
    let monthText = months[date.getMonth()];
    let dayNumber = date.getDate();
    let year = date.getFullYear();
    return `${dayText} ${monthText} ${dayNumber} ${year}`;

}

const calculatePercents = (a, b) => {
    if(Number(b) === 0) {
        return 0;
    }
    return ((Number(a) / Number(b)) * 100).toFixed(1);
}

const tokenControl = {
    getToken: () => {
        const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '' ;
        return token;
    },
    setToken: (value) => {
        localStorage.setItem('accessToken', value)
    },
    clearToken: () => {
        localStorage.setItem('accessToken', null)
    },
}

const sendViaAjax = (data, endpoint) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                res(xhr.response);
            } else {
                rej(xhr.response);
            }
        };
        xhr.send(data);
    });
};

const getMinImageName = name => {
    if(name ==='' || name === undefined) {
        return '';
    }
    let nameArr = name.split('.');
    return nameArr[0] + '_min.' + nameArr[1]; 
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const iq7FlyersURL = 'https://iq7flyer.smarto.com.ua';
//const iq7FlyersURL = 'http://206.189.211.22';
//const iq7FlyersURL = 'https://www.iqflyer.com ';
//const iq7FlyersURL = '';

export { 
    getFormattedDate1, 
    getFormattedDate2, 
    getFormattedDate3, 
    getFormattedDate4, 
    calculatePercents,
    getMinImageName,
    tokenControl, 
    sendViaAjax,
    iq7FlyersURL, 
    debounce 
};