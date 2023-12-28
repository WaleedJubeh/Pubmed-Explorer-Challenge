# Pubmed Explorer Challenge

A React application that is ready for integration with an API. The application has all the needed code to send filter parameters and receive data from the API.

It serves as an explorer for a built dataset from an open-source dataset called Pubmed. The dataset undergoes preprocessing through a cleanup process and field renaming.

[Clone the dataset](https://github.com/WaleedJubeh/ES-Search-App-Dataset)

## Challenge
You have to create an API that provides the following requirements:

* The API should be able to send facets.
* Support abstract highlighting based on the user's search input.
* The API returns the top 10 values for each facet based on the number of occurrences.
* Support the typeahead feature for facets.
* Support both sort options: Relevance and date sort.
* The facet operator for the authors facet is AND, so if 2 authors are selected, the articles that contain both authors will be returned (Intersect).
* The facet operator for journals and languages facets is OR. So if the user selects 2 journals, the result from both journals will be returned (Union).
* If the user selects a value from a facet with the OR operator, the user should see the other facet options. For example, the journals facet has the values: [A, B, C, D]. If the user selects A, they should have the ability to select B, C, and D.
* The choice in one facet should update the other facets. If the user selects Journal A, the language facet values should be updated to display the languages of the articles in Journal A only.

## Environment Variables
```bash
REACT_APP_SEARCH_API=<API URL>
```
## Available Scripts
In the project directory, you can run:

```
npm start
``````