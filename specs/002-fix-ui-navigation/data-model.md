# Data Model: Fix UI and Navigation Issues

**Feature**: 002-fix-ui-navigation  
**Date**: 2026-04-09  
**Purpose**: Document data structures for UI fixes (no new entities added).

## Existing Entities

### Guest
- **Fields**: id (string), name (string), email (string), attending (boolean), message (string)  
- **Validation**: Name and email required, email format valid.  
- **Relationships**: None new.

### Guest Message
- **Fields**: id (string), author (string), content (string), timestamp (Date)  
- **Validation**: Author and content required, content max 500 chars.  
- **Relationships**: None.

### Navigation State
- **Fields**: isOpen (boolean)  
- **Validation**: Boolean.  
- **Relationships**: Controls navbar visibility.

No new entities or state transitions required for this UI-focused feature.