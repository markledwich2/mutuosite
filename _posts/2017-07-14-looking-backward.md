---
layout: post
title: "Why your historical metrics are probably wrong: records that change, and how to report on them"
author: Mark Ledwich
featured-image: /images/2017-07-14-history/dashboard-search.png
---

When using measurements to improve decision making in IT and Service Management (ITSM) systems, it is important to have some context for your current results. Comparisons can be categorised into:
- External - compare with other companies of a similar size/industry
- Internal - compare across different attributes (e.g. groups/users) within your company
- Historical - compare over time (i.e. looking backwards)

A search for dashboards shows how common time based reports are (highlighted below)
<img class="img" src="/images/2017-07-14-history/dashboard-search.png" data-action="zoom"  />

However, many simple historical reports are not provided and are harder to build than you would expect..

ITSM systems have been designed for efficiency of operation first and reporting second. The historical data is usually buried in audit logs, and the format you need for reporting in BI tools requires complex transformation.

Any charting tool, including ServiceNow, will let you plot a metric over time and categorise using other attributes.  However, there is a major limitation in most reporting solutions that will become clear. 

## Records that change over their lifetime
Consider the following simple charts showing the number of incidents over time:

<ol style="list-style-type:lower-alpha">
  <li>By status (e.g. new, active, resolved)</li>

  <li>Percent open longer than 10 days</li>

  <li>By agent assigned </li>

  <li>By created date</li>
</ol>

Based on the current data in your ITSM system, which charts do you think you would be able to plot?

*Answer*: Only d) can be shown using the current incident data!

All the other charts require historical information about the incident. If any incident metric or attribute changes during its lifetime then you will need to consider the historical values of the incident to be able to report on it. This problem is not unique to tickets, sales opportunities and any other records that change over time in important ways are affected. To get your head around what the problem is, here are some examples:

### By status
The status of an incident changes over its lifetime. If you were to plot the status of incidents over time according to their current states, then all of the old incidents would be counted as closed (because that is what is recorded in the system as of this moment).

To show the chart you expect (below) you need to have data for each day (or other time period) with measures and attributes, as they were on those days. 

![incidents by status over time](/images/2017-07-14-history/chart-1.png)

### Percent open longer than 10 days
Both the status and age of an incident change over its lifetime. It is possible to calculate the age of an incident at any point in time based on the created date. However, you need to perform that calculation many times for each period plotted on the chart.

![Percent of open incidents older than 10d over time](/images/2017-07-14-history/chart-2.png)

### By agent assigned
If you consider assigned to be the last person assigned, then this chart can use current data. However, if you are looking at time spent on incidents then as your incidents get escalated or re-assigned, then you need to know the assignment as it was.

![Incidents by agent assigned](/images/2017-07-14-history/chart-3.png)

## Solutions

### ServiceNow Metrics
ServiceNow solves some of these problems with [metric definitions](https://docs.servicenow.com/bundle/geneva-performance-analytics-and-reporting/page/use/advanced_reporting/task/t_CreateAMetricDefinition.html) that are calculated based on triggers (e.g. when an incident changes state) and  stored historically as metric instances. Out of the box, there are some common metric definitions for the duration of incidents (e.g. duration in each incident state). The limitations with metric definitions is that you must:
- Know how to write scripts, and ensure the trigger occurs at any time the metric might change.
- Pro-actively create metrics. They are not calculated retrospectively.
- Report inside service now. Metric instances are not stored in a format that is easy to report on using standard BI tools.

### Snapshot Tables
Another solution is to create snapshot tables with the metrics and attributes that you wish to report on historically. This avoids the limitations with metric definitions and allows you to use standard BI tools (e.g. Tableau or PowerBI). The difficulty with this approach is the expertise required to implement a snapshot table from the ServiceNow audit and incident tables. This can be done either by:
- Creating scripts in ServiceNow that maintain the snapshot table.
- Using data integration tools that can read from the ServiceNow API.

### 3rd Party Solutions
If you are evaluating solutions, ask them if they are able to show any of the simple charts above. If you are interested in having early access to a solution that makes this easy, please [subscribe](http://eepurl.com/ch1esL) to our mailing list.



