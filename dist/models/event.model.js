"use strict";
class Event {
    constructor(id, domainId, alias, eventTypeId, title, start, end, allDay, url, className, editable, startEditable, durationEditable, resourceEditable, rendering, overlap, constraint, source, color, backgroundColor, borderColor, textColor, offerId, interviewer, interviewerEmail, creationDate, modificationDate, place, iAmInterviewer, sendBackupEmail, participants, applicantComment, internalComment, file, hourStart, hourEnd, deleted, eventStateId) {
        this.id = id;
        this.domainId = domainId;
        this.alias = alias;
        this.eventTypeId = eventTypeId;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.url = url;
        this.className = className;
        this.editable = editable;
        this.startEditable = startEditable;
        this.durationEditable = durationEditable;
        this.resourceEditable = resourceEditable;
        this.rendering = rendering;
        this.overlap = overlap;
        this.constraint = constraint;
        this.source = source;
        this.color = color;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.textColor = textColor;
        this.offerId = offerId;
        this.interviewer = interviewer;
        this.interviewerEmail = interviewerEmail;
        this.creationDate = creationDate;
        this.modificationDate = modificationDate;
        this.place = place;
        this.iAmInterviewer = iAmInterviewer;
        this.sendBackupEmail = sendBackupEmail;
        this.participants = participants;
        this.applicantComment = applicantComment;
        this.internalComment = internalComment;
        this.file = file;
        this.hourStart = hourStart;
        this.hourEnd = hourEnd;
        this.deleted = deleted;
        this.eventStateId = eventStateId;
    }
}
exports.Event = Event;
