
# Anatoly Apanyakin Case 

## Overview
This framework provides code for PETSTORE to testing REST API projects using the BDD (Behavior-Driven Development) framework Behave in Python.

My approach to use "context" as global Behave variable to store all data and pass is from step to step

## Installation
To install dependencies, run the following command:
```bash
pip install -r requirements.txt
```

## Running Tests
To run all tests, use:
```bash
behave
```

## Generating HTML Reports
To generate HTML reports after running tests, use:
```bash
behave features/ -f behave_html_formatter:HTMLFormatter -o ./report.html
```

## Project Structure
```
project/
│
├── features/E2E             # BDD feature files
│   ├── feature1.feature
│   └── ...
├── features/Functional             # BDD feature files
│   ├── feature2.feature
│   └── ...
│
├── steps/                # Step definitions
│   ├── steps.py
│   └── base_api.py   #base steps for REST building
│   └── ...
│
└── requirements.txt      # Dependencies
```



## Step Example
step that saves url to context:
```bash
@given('REST. url {url}')
def step_impl(context, url):
    context.url = url
```
step that sends GET request and save response to context
```bash
@given('REST. get')
def step_impl(context):
    context.response = requests.get(
        context.url,
        headers=context.headers
    )

```


## Feature Example
Classic BDD format with Scenario Outline to better re-use
```bash
Feature: Delete pet. Functional testing.
   AQA: Anatoly Apanyakin
   Created: 03/03/2024
   Updated: 03/03/2024

   Background:
      * REST. headers
         """
         {
            "accept": "application/json",
            "Content-Type": "application/json"
         }
         """

   Scenario Outline: Check MessageText in Response
      * REST. url https://petstore.swagger.io/v2/pet<id>
      * REST. delete
      Then REST. check text - <text>

      Examples:
         | id                                     | text                                 |
         | /9223372036854775808 | NumberFormatException |
         | /9223372036854775808 | HereWillBeError               |
```

