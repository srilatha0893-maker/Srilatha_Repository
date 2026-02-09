Feature: TDD and Hookk


@regression
Scenario:TTD and Hooks verification
Given I launch the browsera
When I launch the test automation url
Then TTD and Hooks verification set1
Then I close the browser15
@regression
Scenario:TTD and Hooks verification
Given I launch the browsera
When I launch the test automation url
Then TTD and Hooks verification set2
Then I close the browser15

@method1
Scenario:TTD with feature file
  Given I launch the browsera
  When I launch the test automation url
  Then TTD with feature file "<name>","<email>","<phone>","<address>"
  Then I close the browserd
    Examples:
       | name      | email        | phone    | address  |
       | srilatha  | s@gmail.com  | 77777777 | Hyderabas|
       | Geethu    | G@gmail.com  | 11111111 | Hyderabas|
       | Honey     | H@gmail.com  | 22222222 | Hyderabas|
       | Sriram    | P@gmail.com  | 333333333| Hyderabas|







