import List "mo:core/List";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type Study = {
    id : Int;
    subjectName : Text;
    description : Text;
    studySchedule : Text;
    progress : Nat; // percentage complete
  };

  module Study {
    public func compare(study1 : Study, study2 : Study) : Order.Order {
      Int.compare(study1.id, study2.id);
    };
  };

  public type WorkItem = {
    id : Int;
    projectName : Text;
    description : Text;
    deadline : Time.Time;
    completed : Bool;
  };

  module WorkItem {
    public func compare(workItem1 : WorkItem, workItem2 : WorkItem) : Order.Order {
      Int.compare(workItem1.id, workItem2.id);
    };
  };

  public type Habit = {
    id : Int;
    name : Text;
    description : Text;
    frequencyTarget : Nat; // times per week
    trackingHistory : [Bool]; // 7 days a week
  };

  module Habit {
    public func compare(habit1 : Habit, habit2 : Habit) : Order.Order {
      Int.compare(habit1.id, habit2.id);
    };
  };

  public type Goal = {
    id : Int;
    title : Text;
    description : Text;
    targetDate : Time.Time;
    milestones : [Text];
    completed : Bool;
  };

  module Goal {
    public func compare(goal1 : Goal, goal2 : Goal) : Order.Order {
      Int.compare(goal1.id, goal2.id);
    };
  };

  // Persistent storage
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userStudies = Map.empty<Principal, Set.Set<Study>>();
  let userWorkItems = Map.empty<Principal, Set.Set<WorkItem>>();
  let userHabits = Map.empty<Principal, Set.Set<Habit>>();
  let userGoals = Map.empty<Principal, Set.Set<Goal>>();

  func getOrCreateSet<T>(map : Map.Map<Principal, Set.Set<T>>, principal : Principal) : Set.Set<T> {
    switch (map.get(principal)) {
      case (?existingSet) { existingSet };
      case (null) {
        let newSet = Set.empty<T>();
        map.add(principal, newSet);
        newSet;
      };
    };
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Studies
  public shared ({ caller }) func addStudy(study : Study) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add studies");
    };
    let studies = getOrCreateSet(userStudies, caller);
    studies.add(study);
  };

  public query ({ caller }) func getStudies() : async [Study] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view studies");
    };
    switch (userStudies.get(caller)) {
      case (?studies) { studies.toArray().sort() };
      case (null) { [] };
    };
  };

  // WorkItems
  public shared ({ caller }) func addWorkItem(workItem : WorkItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add work items");
    };
    let workItems = getOrCreateSet(userWorkItems, caller);
    workItems.add(workItem);
  };

  public query ({ caller }) func getWorkItems() : async [WorkItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view work items");
    };
    switch (userWorkItems.get(caller)) {
      case (?workItems) { workItems.toArray().sort() };
      case (null) { [] };
    };
  };

  // Habits
  public shared ({ caller }) func addHabit(habit : Habit) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add habits");
    };
    let habits = getOrCreateSet(userHabits, caller);
    habits.add(habit);
  };

  public query ({ caller }) func getHabits() : async [Habit] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view habits");
    };
    switch (userHabits.get(caller)) {
      case (?habits) { habits.toArray().sort() };
      case (null) { [] };
    };
  };

  // Goals
  public shared ({ caller }) func addGoal(goal : Goal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add goals");
    };
    let goals = getOrCreateSet(userGoals, caller);
    goals.add(goal);
  };

  public query ({ caller }) func getGoals() : async [Goal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view goals");
    };
    switch (userGoals.get(caller)) {
      case (?goals) { goals.toArray().sort() };
      case (null) { [] };
    };
  };
};
