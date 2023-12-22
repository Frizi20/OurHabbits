import { intervalToDuration, format, parseISO } from 'date-fns';
import { ro } from 'date-fns/locale';

export function timePassed(date: string) {
    const timeDiff = intervalToDuration({
        start: new Date(date),
        end: new Date(),
    });

    if ('months' in timeDiff) {
        const months = timeDiff.months;
        if (!months) throw new Error('nu se poate');
        if (months < 6) return format(parseISO(date), 'dd MMM', { locale: ro });
        return format(parseISO(date), 'dd MMM yyyy', { locale: ro });
    }

    if ('days' in timeDiff) {
        const days = timeDiff.days;
        if (!days) throw new Error('nu se poate');
        if (days > 7)
            return format(parseISO(date), 'dd MMM aa', { locale: ro });
        return format(parseISO(date), 'ccc', { locale: ro });
    }

    if ('hours' in timeDiff) {
        const hours = timeDiff.hours;
        if (!hours) throw new Error('nu se poate');
        return format(parseISO(date), "hh:mm aaaaa'm", { locale: ro });
    }

    if ('minutes' in timeDiff) {
        const minutes = timeDiff.minutes;

        if (!minutes) throw new Error('nu se poate');

        return format(parseISO(date), "hh:mm aaaaa'm", { locale: ro });
    }

    if ('seconds' in timeDiff) {
        return format(parseISO(date), "hh:mm aaaaa'm", { locale: ro });
    }

    return format(parseISO(new Date().toISOString()), "hh:mm aaaaa'm", {
        locale: ro,
    });
}

export function timeToHourMinutes(date:string){
    
    return format(parseISO(date), "hh:mm aaaaa'm", {
        locale: ro,
    });
}

export function checkIfIsOnline(contacts, onlinePeople) {
    return contacts.map((contact) => {
        const isActive = !!onlinePeople.find(
            (person) => person.userId === contact._id
        );
        return { ...contact, isActive: isActive };
    });
}