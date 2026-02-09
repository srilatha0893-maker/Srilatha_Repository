Feature: Hooks Feature

Background: background scenario
    @method
    Scenario: Verify data reading from the test data 
        #Given I launch the browser
        Then I launch the test automation practice hooks
        Then Start to type your Then step here I Verify test data reading from the feature file "<Name>","<Email>","<Phone>","<Address>","<Wikipedia>","<errormessgae>"
        # And I close the browser

        Examples:
            | Name        | Email                 | Phone      | Address    | Wikipedia  | errormessgae                          |
            | Devi        | devi@gmail.com        | 8908908908 | Hyderabad  | testing    | text should not exceed 100 characters |
            | Kalyani     | Kalyani@gmail.com     | 1234567890 | Bangalore  | playwright | text should not exceed 100 characters |
            | leela       | leela@gmail.com       | 5678956789 | Chennai    | Selenium   | text should not exceed 100 characters |
            | dhanasekhar | dhanasekhar@gmail.com | 5678567856 | Kukatpalli | java       | text should not exceed 100 characters |
            | divine      | divine@gmail.com      | 6789067890 | kerala     | typescript | text should not exceed 100 characters |

    @method1
    Scenario: Verify data reading from the test data file1
        And I Verify test data reading from the feature file1 "<username>","<password>"
        And I close the browser

        Examples:
            | username | password |
            | Admin    | admin123 |
