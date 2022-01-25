import { Member } from './types'

function privacy(property:String) {
    if (property == "public") {return true} else return false
}

let privacyDiv
export function ConstructPrivacy(element:Array<Member>) {
    privacyDiv = (
        <div id='mem-priv'>
            Member privacy settings <br />
            (Checked is public):
            
            <span><input type="checkbox" checked={privacy(element[1].privacy.visibility)} disabled={true} name="vis" id="vis" />
            <label htmlFor="vis"> Member visibility</label></span>
            
            <span> <input type="checkbox" checked={privacy(element[1].privacy.name_privacy)} disabled={true} name="name" id="name" />
            <label htmlFor="name"> Member name</label></span>
            
            <span><input type="checkbox" checked={privacy(element[1].privacy.description_privacy)} disabled={true} name="desc" id="desc" />
            <label htmlFor="desc"> Member description</label></span>
            
            <span><input type="checkbox" checked={privacy(element[1].privacy.bithday_privacy)} disabled={true} name="dob" id="dob" />
            <label htmlFor="dob"> Member birthday</label></span>
            
            <span><input type="checkbox" checked={privacy(element[1].privacy.pronoun_privacy)} disabled={true} name="prn" id="prn" />
            <label htmlFor="prn"> Member pronouns</label></span>
            
            <span><input type="checkbox" checked={privacy(element[1].privacy.avatar_privacy)} disabled={true} name="pfp" id="pfp" />
            <label htmlFor="pfp"> Member avatar</label></span>
            
            <span><input type="checkbox" checked={privacy(element[1].privacy.metadata_privacy)} disabled={true} name="meta" id="meta" />
            <label htmlFor="meta"> Member metadata</label></span>
        </div>
    )

    return privacyDiv
}