
# Deployment Process
Ref: https://iamchuka.com/gitflow-workflow-continuous-integration-continu/
![image](https://user-images.githubusercontent.com/96769858/147549839-3ae0bcd5-e961-413a-9bf8-01addc534910.png)

# Branches
**main** - This will contain the prod version

**dev** - This branch will be typically replica of main branch. This will be used by developers to start the development

**features/short_description** - 
  1. Developers have to create a feature branch from Dev and then make there changes in local. 
  2. They should do unit testing of features changes in the Dev environment.
  3. They should create a PR to Dev once the feature is ready to move to Dev.
  4. If there is a conflict in PR. Then the developer who worked on the same file (for same or different features). They should collaborate and resolve the conflict to bring changes missing in the file and do the integration testing to make sure both features are working as expected.

**hotfix/short_description** - If there is a immediate change require in the prod. Then Developer will be creating a hotfix branch from main branch. And create a PR to move changes from hotfix to main branch. And after doing that we will have to update the dev branch with that code. And Notify all the developers that dev branch is updated so they have to pull the latest changes from dev to there feature branches.

**releases/date_short_description** - Once it's time for a release, a release branch should be created from the dev branch for final audit eg: cleanup & remove comments, versioning etc. This branch is tagged, and then merged to both master & dev branches.

# Branch Rules
**Developers/Contractor** - Should do all the development on feature branch and create a PR to move changes from feature to Dev. Developers should not complete PR to Dev, Release and Main branch

**Admin/Approver/Reviewer** - Should review the code while completing the pull requests.

# Deployment/Development Calendar
**Monday** - New Development Starts, and Unit Testing has to be completed before review

**Wednesday** - Should have the PR to Dev Branch ready for Review.

**Friday** - PR Should be approved for release branch. No new changes will be a part of release after friday, other then the approved changes.

**Saturday** - Release to Prod

**Sunday** - Prod Testing, Revert etc.
