# Data Send Implementation Plan - Make.com Webhook Integration

## Problems Identified

### 1. **Undefined Variable in Payload (Critical Bug)**
- **Location**: Line 1172 in the payload object
- **Issue**: The payload references `kfw_foederkredit: foerder` but the variable `foerder` is never defined
- **Actual variable name**: The code defines `foerderText` (line 1120), not `foerder`
- **Impact**: This causes a JavaScript error when trying to send data to make.com, preventing the webhook from executing

### 2. **Button Text Typo**
- **Location**: Line 751
- **Current text**: "Meine Ersparnis berechnen"
- **Required text**: "Mein Ersparnis berechnen" (singular "Mein" instead of "Meine")

### 3. **Webhook Execution Timing**
- **Current behavior**: Data is sent AFTER the result panel is shown (line 1186-1190)
- **Required behavior**: Data should be sent WHEN the button is clicked, before showing results
- **Impact**: If the webhook fails, the user still sees results but no data is captured

## Implementation Checklist

### Phase 1: Fix Critical Bug
- [x] Change line 1172 from `kfw_foederkredit: foerder` to `kfw_foederkredit: foerderText`
- [x] Verify the variable name matches the definition on line 1120

### Phase 2: Fix Button Text
- [x] Change line 751 button text from "Meine Ersparnis berechnen" to "Mein Ersparnis berechnen"

### Phase 3: Restructure Webhook Call Timing
- [x] Move the webhook fetch call (lines 1186-1190) to execute BEFORE the result panel is shown
- [x] Add error handling for webhook failures
- [x] Consider adding a loading state to the button while webhook is being sent
- [x] Ensure the payload is built correctly before the fetch call
- [x] Test that the webhook executes immediately upon button click

### Phase 4: Testing & Verification
- [ ] Test the form submission with valid data
- [ ] Verify make.com receives the complete payload
- [ ] Check that all fields are correctly mapped in make.com
- [ ] Test with invalid data to ensure error handling works
- [ ] Verify the button text displays correctly
- [ ] Confirm the webhook fires before results are shown

## Technical Notes

### Current Webhook Flow (Broken)
1. User clicks button
2. Validation runs
3. Calculations performed
4. Results shown to user
5. Webhook attempts to send (fails due to undefined variable)

### Proposed Webhook Flow (Fixed)
1. User clicks button
2. Validation runs
3. Calculations performed
4. Payload built with correct variable names
5. Webhook sends data to make.com
6. Results shown to user
7. Error handling if webhook fails

### Payload Structure
The payload includes:
- Contact data (name, plz, telefon, email)
- Form inputs (strom_monatlich_eur, personen, dachausrichtung, dachflaeche_m2, speicher, heizung, stromnutzung)
- Calculated results (ersparnis_jahr_eur, anlage_kwp, anzahl_module, amortisation_jahre, co2_einsparung_t, kfw_foederkredit)
- UTM parameters (utm_source, utm_medium, utm_campaign, utm_adset, utm_ad)
- Metadata (timestamp, seite)

## Files to Modify
- `index.html` (lines 751, 1172, and restructure webhook call timing around lines 1186-1190)
